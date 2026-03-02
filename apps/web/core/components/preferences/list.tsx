import { PREFERENCE_OPTIONS } from "@planner/constants";
import { PREFERENCE_COMPONENTS } from "@/planner-web/components/preferences/config";

export function PreferencesList() {
  return (
    <div className="py-6 space-y-6">
      {PREFERENCE_OPTIONS.map((option) => {
        const Component = PREFERENCE_COMPONENTS[option.id as keyof typeof PREFERENCE_COMPONENTS];
        return <Component key={option.id} option={option} />;
      })}
    </div>
  );
}
