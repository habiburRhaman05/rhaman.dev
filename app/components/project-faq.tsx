const questions = [
  { q: "What does Habibur Rahman build?", a: "I develop web and mobile applications, admin dashboards and AI agents. I also connect business systems through CRM integrations and workflow automation." },
  { q: "Can you help with GoHighLevel and business automation?", a: "My work includes GoHighLevel CRM setup, lead follow-up, booking and payment workflows, voice AI integrations, and automation using tools such as n8n, Zapier, Make.com and ManyChat. Scope depends on your existing tools and requirements." },
  { q: "Are these personal projects or company client projects?", a: "The portfolio separates personal work from company and client projects. Company projects may be team deliveries; individual project descriptions and collaborator credits explain that context." },
  { q: "How can we discuss a project or engineering role?", a: "Use Book a Call to choose a time, or email devhabib2005@gmail.com. Share your business problem, current systems and the work you need help with." }
];
export default function ProjectFaq() {
  return <section id="faq" className="py-16" aria-labelledby="faq-title">
    <h2 id="faq-title" className="text-3xl font-bold tracking-tight">Working together</h2>
    <p className="mt-3 text-muted-foreground">A few answers before we talk.</p>
    <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card px-6">
      {questions.map(({q,a}) => <details key={q} className="py-5"><summary className="cursor-pointer font-medium focus-visible:outline-primary">{q}</summary><p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{a}</p></details>)}
    </div>
  </section>;
}
