type Props = {
  title: string;
  description: string;
};

export default function Heading({ description, title }: Props) {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  );
}
