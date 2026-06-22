export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-[#3d3d3f]">
          © {new Date().getFullYear()} Shivansh Malik. All rights reserved.
        </span>
        <span className="text-xs text-[#3d3d3f]">Designed & built with precision.</span>
      </div>
    </footer>
  );
}
