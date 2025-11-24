import Link from 'next/link';
import { ArrowRight, Activity, Zap, BarChart3, Cpu, Radio, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#4F46E5] opacity-10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-[#4F46E5] mr-2"></span>
          <span className="text-sm font-medium text-[#4F46E5]">System Operational</span>
        </div>

        {/* Hero Text */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#F8FAFC]">
            Smart City <span className="text-[#4F46E5]">Monitoring</span>
          </h1>

          <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Real-time traffic and pollution analytics powered by AI.
            Simulate IoT networks and visualize urban health data in a modern dashboard.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/dashboard"
            className="btn-primary flex items-center"
          >
            Open Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/iot"
            className="btn-secondary flex items-center"
          >
            <Radio className="mr-2 w-5 h-5 text-[#22D3EE]" />
            Launch Simulator
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
          {[
            { icon: Cpu, color: 'text-[#4F46E5]', title: 'Neural Core', desc: 'Rule-based prediction engine processing live telemetry.' },
            { icon: Globe, color: 'text-[#22D3EE]', title: 'IoT Network', desc: 'Simulated mesh of sensors streaming real-time data.' },
            { icon: BarChart3, color: 'text-[#22C55E]', title: 'Live Analytics', desc: 'Visualize urban health metrics with dynamic charts.' }
          ].map((feature, idx) => (
            <div key={idx} className="card group">
              <div className={`w-12 h-12 rounded-xl bg-[#1E293B] flex items-center justify-center mb-4 border border-[#334155] group-hover:border-[#4F46E5]/50 transition-colors`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{feature.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
