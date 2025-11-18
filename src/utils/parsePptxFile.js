import JSZip from 'jszip';

// Extract plain text from a .pptx ArrayBuffer by reading slide XML files.
// Returns an object: { text: string, slides: number }
export async function parsePptxFile(arrayBuffer) {
  const zip = await JSZip.loadAsync(arrayBuffer);
  const slideFiles = [];

  zip.forEach((relativePath, file) => {
    const p = relativePath.replace(/\\\\/g, '/');
    if (/^ppt\/slides\/slide\d+\.xml$/.test(p)) {
      slideFiles.push(p);
    }
  });

  slideFiles.sort((a, b) => {
    const aNum = parseInt(a.match(/slide(\d+)\.xml$/)[1], 10);
    const bNum = parseInt(b.match(/slide(\d+)\.xml$/)[1], 10);
    return aNum - bNum;
  });

  const texts = [];
  for (const path of slideFiles) {
    try {
      const file = zip.file(path);
      if (!file) continue;
      const xml = await file.async('string');
      // extract text nodes inside <a:t> or plain text between tags
      // Use [\s\S] instead of dotAll flag for wider parser compatibility
      const re = /<a:t[^>]*>([\s\S]*?)<\/a:t>/gi;
      const matches = [];
      let mm;
      while ((mm = re.exec(xml)) !== null) {
        matches.push(mm[1]);
      }
      if (matches.length) {
        for (const txtRaw of matches) {
          // decode common XML entities
          const txt = txtRaw.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&quot;/g, '"');
          texts.push(txt.trim());
        }
      } else {
        // fallback: strip tags and push remaining text
        const stripped = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (stripped) texts.push(stripped);
      }
    } catch (err) {
      // ignore per-slide errors
    }
  }

  return { text: texts.join('\n\n'), slides: slideFiles.length };
}
