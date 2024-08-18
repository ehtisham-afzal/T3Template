export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
      <main className="w-full flex justify-center items-start mt-16">
      <div className="prose prose-headings:mt-8 prose-headings:font-semibold text-primary prose-headings:text-primary prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-img:rounded-md ">
        {children}
      </div></main>
    )
  }