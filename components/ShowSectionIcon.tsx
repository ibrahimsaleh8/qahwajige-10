import { getIconComponent } from "@/lib/getIconComponent";

type Props = {
  icon?: string;
};
export default function ShowSectionIcon({ icon }: Props) {
  return (() => {
    const Icon = getIconComponent(icon);
    return Icon ? (
      <span className="w-16 h-16 bg-main-color/10 from-main-color to-accent-pink/60 rounded-2xl flex items-center justify-center mb-6 mx-auto">
        <Icon className="w-8 h-8 text-main-color" />
      </span>
    ) : null;
  })();
}
