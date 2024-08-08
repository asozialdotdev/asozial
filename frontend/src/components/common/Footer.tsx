function Footer() {

  const techStack = [
    { name: "Next.js", url: "https://nextjs.org/", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
    { name: "TypeScript", url: "https://www.typescriptlang.org/", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/", icon: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" },
    { name: "Node.js", url: "https://nodejs.org/", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
    { name: 'Express', url: 'https://expressjs.com/', icon: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png' },
    { name: 'MongoDB', url: 'https://www.mongodb.com/', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg' },
    { name: 'Mongoose', url: 'https://mongoosejs.com/', icon: 'https://avatars.githubusercontent.com/u/7552965?s=400&v=4' },
  ]
  return (
    <nav className="h-10vh flex flex-col gap-2 border-t-2 items-center">
      <h1 className="font-sans text-xl">© 2024 asozial</h1>
      <ul className="font-sans flex flex-row gap-6 flex-wrap">
        {
          techStack.map((tech) => (
            <li key={tech.name} className="flex flex-row gap-2 items-center">
              <img src={tech.icon} alt={tech.name} className="w-12 h-auto max-h-6" />
              <a title="url" href={tech.url} target="_blank" rel="noreferrer"></a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Footer