import Image from 'next/image';

// "Trusted By" logo wall — Peter personally chose these. Two rows mirroring
// the layout on plattpartners.com: restaurants on top, tech / other below.
// If you change the order or composition, check with Peter first.

type Logo = { src: string; alt: string };

const RESTAURANTS: Logo[] = [
  { src: '/clients/qdoba.png', alt: 'QDOBA Mexican Eats' },
  { src: '/clients/jitb.png', alt: 'Jack in the Box' },
  { src: '/clients/el-pollo-loco.png', alt: 'El Pollo Loco' },
  { src: '/clients/del-taco.png', alt: 'Del Taco' },
];

const TECH_AND_OTHER: Logo[] = [
  { src: '/clients/oracle.png', alt: 'Oracle' },
  { src: '/clients/pwc.png', alt: 'PwC' },
  { src: '/clients/gitlab.png', alt: 'GitLab' },
  { src: '/clients/spacex.png', alt: 'SpaceX' },
  { src: '/clients/petco.png', alt: 'Petco' },
];

type Props = {
  /** Background color treatment — `muted` for an alternating section, `transparent` to inherit. */
  background?: 'muted' | 'transparent';
};

export function TrustedBy({ background = 'muted' }: Props) {
  const bgClass =
    background === 'muted' ? 'border-y border-border bg-muted/30' : 'border-y border-border';

  return (
    <section className={`${bgClass} py-12`}>
      <div className="container">
        <p className="mb-10 text-center font-display text-sm uppercase tracking-widest text-platt-secondary">
          Trusted By:
        </p>

        {/* Row 1 — restaurants */}
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-16">
          {RESTAURANTS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={64}
              className="h-10 w-auto object-contain md:h-12"
            />
          ))}
        </div>

        {/* Divider */}
        <div className="mx-auto my-8 max-w-3xl border-t border-border/70" />

        {/* Row 2 — tech and other */}
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
          {TECH_AND_OTHER.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={56}
              className="h-8 w-auto object-contain md:h-10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
