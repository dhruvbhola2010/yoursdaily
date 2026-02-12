const FloatingBlobs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary violet blob */}
      <div className="absolute h-[60vh] w-[60vh] rounded-full bg-[#8B5CF6]/10 blur-3xl top-[10%] -left-[10%] animate-clay-float" />
      {/* Pink blob */}
      <div className="absolute h-[50vh] w-[50vh] rounded-full bg-[#EC4899]/10 blur-3xl right-[5%] top-[20%] animate-clay-float-delayed animation-delay-2000" />
      {/* Blue blob */}
      <div className="absolute h-[55vh] w-[55vh] rounded-full bg-[#0EA5E9]/10 blur-3xl bottom-[10%] left-[20%] animate-clay-float-slow animation-delay-4000" />
      {/* Warm amber blob */}
      <div className="absolute h-[40vh] w-[40vh] rounded-full bg-[#F59E0B]/8 blur-3xl top-[60%] right-[15%] animate-clay-float" />
    </div>
  );
};

export default FloatingBlobs;
