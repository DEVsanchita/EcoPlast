import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaFlask,
  FaLeaf,
  FaLayerGroup,
  FaLightbulb,
  FaSearch,
  FaThermometerHalf,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Prepare the Mixture",
    image: "/bioplastic/01-mixture.jpg",
    icon: FaFlask,
    points: [
      "Measured starch, water, glycerol, and vinegar.",
      "Mixed all the ingredients thoroughly until a uniform milky suspension was obtained.",
    ],
    observation: "Smooth, milky suspension",
  },
  {
    number: "02",
    title: "Heat & Gelatinize",
    image: "/bioplastic/02-gelatinize.jpg",
    icon: FaThermometerHalf,
    points: [
      "Heated the mixture using a double-boiler method while stirring continuously.",
      "Starch gelatinized, and the mixture became thick, smooth, and viscous.",
    ],
    observation: "Gelatinization produced a thick, smooth paste",
  },
  {
    number: "03",
    title: "Film Casting",
    image: "/bioplastic/03-casting.jpg",
    icon: FaLayerGroup,
    points: [
      "Poured the hot gelatinized paste onto a clean, flat tray.",
      "Spread it as uniformly as possible using a spoon to obtain even thickness.",
    ],
    observation: "Uniform thickness for better film formation",
  },
  {
    number: "04",
    title: "Drying",
    image: "/bioplastic/04-drying.jpg",
    icon: FaClock,
    points: [
      "Allowed the cast film to dry at room temperature for 24–48 hours.",
    ],
    observation: "Film gradually became transparent as moisture evaporated",
  },
  {
    number: "05",
    title: "Final Film",
    image: "/bioplastic/05-final-film.jpg",
    icon: FaSearch,
    points: [
      "After drying, the film was carefully peeled from the tray.",
      "A continuous, flexible starch-based film was obtained without cracks.",
    ],
    observation: "Thin, uniform and flexible film formed without visible cracks",
  },
];

const improvements = [
  "Adjust glycerol concentration to further improve flexibility.",
  "Cast a thinner and more uniform film.",
  "Use a smoother non-stick surface (e.g., silicone sheet or glass).",
  "Control drying conditions (cover film to reduce rapid moisture loss).",
  "Explore natural fillers (e.g., peanut shell powder, eggshell powder) to enhance mechanical strength.",
];

function StepCard({ step }) {
  const Icon = step.icon;

  return (
    <article className="group relative h-full rounded-2xl border border-emerald-800/40 bg-slate-900/70 p-3 shadow-xl shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:bg-slate-900">
      <div className="relative overflow-hidden rounded-xl border border-emerald-900/50 bg-slate-950">
        <img
          src={step.image}
          alt={`${step.title} in the starch-based bioplastic process`}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-emerald-950/90 text-sm font-extrabold text-white shadow-lg">
          {step.number}
        </div>
      </div>

      <div className="px-2 pb-2 pt-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Icon className="text-sm" />
          </span>
          <h3 className="text-base font-extrabold uppercase tracking-wide text-white">{step.title}</h3>
        </div>

        <ul className="space-y-2 text-sm leading-relaxed text-emerald-100/65">
          {step.points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-1 text-emerald-400">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-xl border border-emerald-700/30 bg-emerald-500/[0.06] p-3">
          <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[2px] text-emerald-400">Observation</div>
          <p className="text-xs font-medium leading-relaxed text-emerald-50/80">{step.observation}</p>
        </div>
      </div>
    </article>
  );
}

function InfoPanel({ title, children, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-emerald-800/40 bg-slate-900/70 p-5 sm:p-6 shadow-xl shadow-black/10">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <Icon />
        </span>
        <h3 className="text-lg font-extrabold uppercase tracking-wide text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function BioplasticExperiments() {
  return (
    <section id="experiments" className="relative overflow-hidden border-t border-emerald-900/20 py-24 sm:py-28">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(16,185,129,0.06),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-16">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[3px] text-emerald-400">
            <FaLeaf /> LAB NOTES · STEP-BY-STEP PROCESS
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Development of a Starch-Based Bioplastic Film
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-emerald-100/60 sm:text-base">
            A visual record of the preparation, gelatinization, casting, drying, and final formation of a flexible starch-based bioplastic film.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <InfoPanel title="Overall Observations" icon={FaCheckCircle}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Initial mixture was smooth and milky.",
                "Gelatinization produced a thick, viscous paste.",
                "Film cast successfully after gelatinization.",
                "A continuous and uniform film was obtained after drying.",
                "Film was flexible and could be peeled without cracks.",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 rounded-xl border border-emerald-900/30 bg-slate-950/30 p-3 text-sm leading-relaxed text-emerald-50/75">
                  <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </InfoPanel>

          <InfoPanel title="Possible Improvements for Next Trial" icon={FaLightbulb}>
            <ul className="space-y-3">
              {improvements.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-emerald-50/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </InfoPanel>
        </div>
      </div>
    </section>
  );
}
