import Image from "next/image";

export const PoweredByBadge: React.FC = () => {
  return (
    <div className="shadow-lg hover:shadow-xl transition-all z-50 bg-slate-800/90 border border-slate-700/50 rounded-lg px-3 py-2 backdrop-blur-sm">
      <a 
        href="https://shaped.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-slate-300 hover:text-slate-100 transition-colors"
      >
        <span>Powered by</span>
        <Image 
          src="https://docs.shaped.ai/img/shaped-icon.svg" 
          alt="Shaped"
          width={20}
          height={20}
          className="h-5 w-auto"
        />
      </a>
    </div>
  );
};

