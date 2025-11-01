import { Card } from './UIComponents'

function TextAreaCard({ label, value, onChange, readOnly, placeholder }) {
    return (
        <Card>
            <h2 className="uppercase tracking-wide text-slate-500 text-sm mb-3">
                {readOnly ? 'Output' : 'Input'}
            </h2>
            <label className="text-slate-600 text-sm mb-1 block">{label}</label>
            <textarea
                className="w-full min-h-40 resize-none rounded-xl px-3 py-2 text-sm
                           bg-white/70 backdrop-blur border border-white/60 ring-1 ring-white/50
                           focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-300
                           shadow-inner shadow-black/5"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
            />
            <div className="text-slate-500 text-xs mt-2">Length: {value.length}</div>
        </Card>
    )
}

export default TextAreaCard
