// import { forwardRef } from 'react';
// import { Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

// export const ResumePreview = forwardRef(function ResumePreview({ data, styling, template }, ref) {
//   const titles = {
//     summary: data.sectionTitles?.summary || data.summary?.title || 'Summary',
//     skills: data.sectionTitles?.skills || 'Skills',
//     experience: data.sectionTitles?.experience || 'Experience',
//     projects: data.sectionTitles?.projects || 'Projects',
//     achievements: data.sectionTitles?.achievements || 'Achievements',
//     education: data.sectionTitles?.education || 'Education'
//   };
//   const compact = ['latex', 'ats'].includes(template);
//   const accent = template === 'executive' ? '#334155' : '#111827';

//   return (
//     <article
//       ref={ref}
//       className={`resume-page mx-auto template-${template}`}
//       style={{
//         padding: compact ? Math.min(styling.pageMargin, 34) : styling.pageMargin,
//         fontFamily: styling.fontFamily,
//         fontSize: compact ? Math.min(styling.fontSize, 11) : styling.fontSize,
//         lineHeight: compact ? Math.min(styling.lineHeight, 1.3) : styling.lineHeight,
//         letterSpacing: 0
//       }}
//     >
//       <Header data={data} template={template} accent={accent} />
//       <Section title={titles.summary} accent={accent} gap={compact ? 8 : styling.sectionGap} template={template}>
//         <RichText text={data.summary.description} />
//       </Section>
//       <Section title={titles.skills} accent={accent} gap={compact ? 8 : styling.sectionGap} template={template}>
//         <div className={compact ? 'grid gap-1' : 'grid gap-0.5'}>
//           {data.skills.map((group) => (
//             <p key={group.category}><b>{group.category}:</b> {group.skills.join(', ')}</p>
//           ))}
//         </div>
//       </Section>
//       <Section title={titles.experience} accent={accent} gap={compact ? 8 : styling.sectionGap} template={template}>
//         {data.experience.map((job, index) => (
//           <Entry key={index} title={job.jobTitle} right={dateRange(job)} subtitle={`${job.company}${job.location ? ` (${job.location})` : ''}`} meta={job.skillsUsed} bullets={job.bullets} compact={compact} />
//         ))}
//       </Section>
//       <Section title={titles.projects} accent={accent} gap={compact ? 8 : styling.sectionGap} template={template}>
//         {data.projects.map((project, index) => (
//           <Entry
//             key={index}
//             title={project.name}
//             right={dateRange(project)}
//             subtitle={[project.skillsUsed, project.location].filter(Boolean).join(' | ')}
//             links={[
//               { href: project.liveUrl, icon: Globe, symbol: 'LIVE', label: 'Live project' },
//               { href: project.githubUrl, icon: Github, symbol: 'GH', label: 'GitHub' }
//             ]}
//             bullets={project.bullets}
//             compact={compact}
//           />
//         ))}
//       </Section>
//       <Section title={titles.achievements} accent={accent} gap={compact ? 8 : styling.sectionGap} template={template}>
//         <ul className="resume-bullets">
//           {data.achievements.map((item, index) => <li key={index}><b>{item.title}:</b> <RichText text={item.description} /></li>)}
//         </ul>
//       </Section>
//       <Section title={titles.education} accent={accent} gap={compact ? 8 : styling.sectionGap} template={template}>
//         {data.education.map((item, index) => (
//           <Entry key={index} title={item.program || item.school} right={dateRange(item)} subtitle={item.school} meta={[item.course, item.score].filter(Boolean).join(' | ')} bullets={[]} compact={compact} />
//         ))}
//       </Section>
//       {data.customSections?.map((section) => (
//         <Section key={section.title} title={section.title} accent={accent} gap={compact ? 8 : styling.sectionGap} template={template}>
//           <ul className="resume-bullets">{section.entries.map((entry) => <li key={entry}><RichText text={entry} /></li>)}</ul>
//         </Section>
//       ))}
//     </article>
//   );
// });

// function Header({ data, template, accent }) {
//   const centered = ['latex', 'ats', 'executive'].includes(template);
//   const contacts = [
//     { value: data.personal.phone, icon: Phone, symbol: 'TEL', label: data.personal.phone },
//     { value: data.personal.email, icon: Mail, symbol: 'MAIL', label: data.personal.email, href: `mailto:${data.personal.email}` },
//     { value: data.personal.linkedIn, icon: Linkedin, symbol: 'IN', label: 'LinkedIn', href: normalizeUrl(data.personal.linkedIn) },
//     { value: data.personal.github, icon: Github, symbol: 'GH', label: 'GitHub', href: normalizeUrl(data.personal.github) },
//     { value: data.personal.portfolio, icon: Globe, symbol: 'WEB', label: 'Portfolio', href: normalizeUrl(data.personal.portfolio) },
//     { value: data.personal.location, icon: MapPin, symbol: 'LOC', label: data.personal.location }
//   ].filter((item) => item.value);

//   return (
//     <header className={centered ? 'text-center' : 'border-b pb-3'} style={{ borderColor: accent }}>
//       <h1 className={template === 'latex' ? 'text-[28px] font-black uppercase' : 'text-3xl font-black'} style={{ color: accent }}>{data.personal.fullName || 'Your Name'}</h1>
//       <p className="mt-1 text-base font-black uppercase">{data.personal.title || 'Professional Title'}</p>
//       <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px]">
//         {contacts.map((item) => <IconText key={item.label} {...item} />)}
//       </div>
//     </header>
//   );
// }

// function Section({ title, accent, gap, template, children }) {
//   const isLatex = ['latex', 'ats'].includes(template);
//   return (
//     <section className="resume-section" style={{ marginTop: gap }}>
//       <h2
//         className={isLatex ? 'mb-1 border-b border-black pb-0.5 text-sm font-black uppercase' : 'mb-2 border-l-4 pl-3 text-sm font-black uppercase'}
//         style={isLatex ? undefined : { color: accent, borderColor: accent }}
//       >
//         {title}
//       </h2>
//       {children}
//     </section>
//   );
// }

// function Entry({ title, right, subtitle, meta, links = [], bullets = [], compact }) {
//   return (
//     <div className={compact ? 'mb-2 avoid-break' : 'mb-4 avoid-break'}>
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h3 className="flex items-center gap-1 font-black">
//             {title}
//             {links.filter((link) => link.href).map(({ href, icon: Icon, symbol, label }) => (
//               <a key={label} data-symbol={symbol} href={normalizeUrl(href)} target="_blank" rel="noreferrer" title={label} className="project-link text-ink">
//                 <Icon size={12} strokeWidth={2.2} />
//               </a>
//             ))}
//           </h3>
//           {subtitle && <p className="italic">{subtitle}</p>}
//         </div>
//         {right && <p className="shrink-0 text-right text-[11px] font-black">{right}</p>}
//       </div>
//       {meta && <p className="text-[11px] italic">{meta}</p>}
//       {!!bullets.length && (
//         <ul className={compact ? 'resume-bullets mt-1' : 'resume-bullets mt-2'}>
//           {bullets.map((bullet) => <li key={bullet}><RichText text={bullet} /></li>)}
//         </ul>
//       )}
//     </div>
//   );
// }

// function IconText({ icon: Icon, symbol, label, href }) {
//   const content = (
//     <>
//       <Icon className="contact-icon" size={11} strokeWidth={2.2} />
//       <span className="contact-label">{label}</span>
//     </>
//   );
//   return href
//     ? <a className="contact-item" data-symbol={symbol} href={href} target="_blank" rel="noreferrer">{content}</a>
//     : <span className="contact-item" data-symbol={symbol}>{content}</span>;
// }

// function dateRange(item) {
//   return [item.startDate, item.current ? 'Present' : item.endDate].filter(Boolean).join(' - ') || item.duration || '';
// }

// function normalizeUrl(value = '') {
//   if (!value) return '';
//   if (value.startsWith('mailto:')) return value;
//   return /^https?:\/\//i.test(value) ? value : `https://${value}`;
// }

// function RichText({ text = '' }) {
//   const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
//   return (
//     <>
//       {parts.map((part, index) => part.startsWith('**') && part.endsWith('**')
//         ? <strong key={index}>{part.slice(2, -2)}</strong>
//         : <span key={index}>{part}</span>)}
//     </>
//   );
// }




import { forwardRef } from 'react';
import { Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const ResumePreview = forwardRef(function ResumePreview({ data, styling, template }, ref) {
  const titles = {
    summary: data.sectionTitles?.summary || data.summary?.title || 'Summary',
    skills: data.sectionTitles?.skills || 'Skills',
    experience: data.sectionTitles?.experience || 'Experience',
    projects: data.sectionTitles?.projects || 'Projects',
    achievements: data.sectionTitles?.achievements || 'Achievements',
    education: data.sectionTitles?.education || 'Education'
  };

  const compact = ['latex', 'ats'].includes(template);
  const accent = template === 'executive' ? '#334155' : '#111827';

  return (
    <article
      ref={ref}
      className={`resume-page mx-auto template-${template}`}
      style={{
        padding: compact ? Math.min(styling.pageMargin, 34) : styling.pageMargin,
        fontFamily: styling.fontFamily,
        fontSize: compact ? Math.min(styling.fontSize, 11) : styling.fontSize,
        lineHeight: compact ? Math.min(styling.lineHeight, 1.3) : styling.lineHeight,
        letterSpacing: 0
      }}
    >
      <Header data={data} template={template} accent={accent} />

      <Section
        title={titles.summary}
        accent={accent}
        gap={compact ? 8 : styling.sectionGap}
        template={template}
      >
        <RichText text={data.summary.description} />
      </Section>

      <Section
        title={titles.skills}
        accent={accent}
        gap={compact ? 8 : styling.sectionGap}
        template={template}
      >
        <ul className="resume-bullets">
          {data.skills.map((group) => (
            <li key={group.category}>
              <b>{group.category}:</b> {group.skills.join(', ')}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title={titles.experience}
        accent={accent}
        gap={compact ? 8 : styling.sectionGap}
        template={template}
      >
        {data.experience.map((job, index) => (
          <Entry
            key={index}
            title={job.jobTitle}
            right={dateRange(job)}
            subtitle={`${job.company}${job.location ? ` (${job.location})` : ''}`}
            meta={job.skillsUsed}
            bullets={job.bullets}
            compact={compact}
          />
        ))}
      </Section>

      <Section
        title={titles.projects}
        accent={accent}
        gap={compact ? 8 : styling.sectionGap}
        template={template}
      >
        {data.projects.map((project, index) => (
          <Entry
            key={index}
            title={project.name}
            right={dateRange(project)}
            subtitle={[project.location].filter(Boolean).join(' | ')}
            meta={project.skillsUsed}
            links={[
              {
                href: project.liveUrl,
                icon: Globe,
                symbol: 'LIVE',
                label: 'Live project'
              },
              {
                href: project.githubUrl,
                icon: Github,
                symbol: 'GH',
                label: 'GitHub'
              }
            ]}
            bullets={project.bullets}
            compact={compact}
          />
        ))}
      </Section>

      <Section
        title={titles.achievements}
        accent={accent}
        gap={compact ? 8 : styling.sectionGap}
        template={template}
      >
        <ul className="resume-bullets">
          {data.achievements.map((item, index) => (
            <li key={index}>
              <b>{item.title}:</b> <RichText text={item.description} />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title={titles.education}
        accent={accent}
        gap={compact ? 8 : styling.sectionGap}
        template={template}
      >
        {data.education.map((item, index) => (
          <Entry
            key={index}
            title={item.program || item.school}
            right={dateRange(item)}
            subtitle={item.school}
            meta={[item.course, item.score].filter(Boolean).join(' | ')}
            bullets={[]}
            compact={compact}
          />
        ))}
      </Section>

      {data.customSections?.map((section) => (
        <Section
          key={section.title}
          title={section.title}
          accent={accent}
          gap={compact ? 8 : styling.sectionGap}
          template={template}
        >
          <ul className="resume-bullets">
            {section.entries.map((entry) => (
              <li key={entry}>
                <RichText text={entry} />
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </article>
  );
});

function Header({ data, template, accent }) {
  const centered = ['latex', 'ats', 'executive'].includes(template);

  const contacts = [
    { value: data.personal.phone, icon: Phone, symbol: 'TEL', label: data.personal.phone },
    {
      value: data.personal.email,
      icon: Mail,
      symbol: 'MAIL',
      label: data.personal.email,
      href: `mailto:${data.personal.email}`
    },
    {
      value: data.personal.linkedIn,
      icon: Linkedin,
      symbol: 'IN',
      label: 'LinkedIn',
      href: normalizeUrl(data.personal.linkedIn)
    },
    {
      value: data.personal.github,
      icon: Github,
      symbol: 'GH',
      label: 'GitHub',
      href: normalizeUrl(data.personal.github)
    },
    {
      value: data.personal.portfolio,
      icon: Globe,
      symbol: 'WEB',
      label: 'Portfolio',
      href: normalizeUrl(data.personal.portfolio)
    },
    {
      value: data.personal.location,
      icon: MapPin,
      symbol: 'LOC',
      label: data.personal.location
    }
  ].filter((item) => item.value);

  return (
    <header
      className={centered ? 'text-center' : 'border-b pb-3'}
      style={{ borderColor: accent }}
    >
      <h1
        className={template === 'latex' ? 'text-[28px] font-black uppercase -mt-5' : '-mt-5 text-3xl font-black'}
        style={{ color: accent }}
      >
        {data.personal.fullName || 'Full Name'}
      </h1>

      <p className="mt-1 text-base font-black uppercase">
        {data.personal.title || ''}
      </p>

      <div className="mt-2 underline mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[14px]">
        {contacts.map((item) => (
          <IconText key={item.label} {...item} />
        ))}
      </div>
    </header>
  );
}

function Section({ title, accent, gap, template, children }) {
  const isLatex = ['latex', 'ats'].includes(template);

  return (
    <section className="resume-section" style={{ marginTop: gap }}>
      <h2
        className={
          isLatex
            ? 'mb-1 border-b border-black pb-0.5 text-md font-black uppercase'
            : 'mb-2 border-l-4 pl-2 text-md font-black uppercase'
        }
        style={isLatex ? undefined : { color: accent, borderColor: accent }}
      >
        {title}
      </h2>

      {children}
    </section>
  );
}

function Entry({
  title,
  right,
  subtitle,
  meta,
  links = [],
  bullets = [],
  compact
}) {
  return (
    <div className={compact ? 'mb-2 avoid-break' : 'mb-4 avoid-break'}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="flex flex-wrap items-center gap-1 font-black">
            <span>{title}</span>

            {links
              .filter((link) => link.href)
              .map(({ href, icon: Icon, symbol, label }) => (
                <a
                  key={label}
                  data-symbol={symbol}
                  href={normalizeUrl(href)}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  className="project-link text-ink"
                >
                  <Icon size={12} strokeWidth={2.2} />
                </a>
              ))}

            {meta && (
              <>
                <span>|</span>
                <span className="font-normal text-gray-600 italic">{meta}</span>
              </>
            )}
          </h3>

          {subtitle && <p className="italic">{subtitle}</p>}
        </div>

        {right && (
          <p className="shrink-0 text-right text-[13px] font-black">
            {right}
          </p>
        )}
      </div>

      {!!bullets.length && (
        <ul className={compact ? 'resume-bullets mt-1' : 'resume-bullets mt-2'}>
          {bullets.map((bullet) => (
            <li key={bullet}>
              <RichText text={bullet} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function IconText({ icon: Icon, symbol, label, href }) {
  const content = (
    <>
      <Icon className="contact-icon" size={11} strokeWidth={2.2} />
      <span className="contact-label">{label}</span>
    </>
  );

  return href ? (
    <a
      className="contact-item"
      data-symbol={symbol}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <span className="contact-item" data-symbol={symbol}>
      {content}
    </span>
  );
}

function dateRange(item) {
  return [item.startDate, item.current ? 'Present' : item.endDate]
    .filter(Boolean)
    .join(' - ') || item.duration || '';
}

function normalizeUrl(value = '') {
  if (!value) return '';
  if (value.startsWith('mailto:')) return value;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function RichText({ text = '' }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}