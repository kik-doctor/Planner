import { observer } from "mobx-react";
// planner imports
import type { EProductSubscriptionEnum, TBillingFrequency } from "@planner/types";
// components
import { PlansComparisonBase, shouldRenderPlanDetail } from "@/components/workspace/billing/comparison/base";
import type { TPlannerPlans } from "@/constants/plans";
import { PLANNER_PLANS } from "@/constants/plans";
// planner web imports
import { PlanDetail } from "./plan-detail";

type TPlansComparisonProps = {
  isCompareAllFeaturesSectionOpen: boolean;
  getBillingFrequency: (subscriptionType: EProductSubscriptionEnum) => TBillingFrequency | undefined;
  setBillingFrequency: (subscriptionType: EProductSubscriptionEnum, frequency: TBillingFrequency) => void;
  setIsCompareAllFeaturesSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlansComparison = observer(function PlansComparison(props: TPlansComparisonProps) {
  const {
    isCompareAllFeaturesSectionOpen,
    getBillingFrequency,
    setBillingFrequency,
    setIsCompareAllFeaturesSectionOpen,
  } = props;
  // plan details
  const { planDetails } = PLANNER_PLANS;

  return (
    <PlansComparisonBase
      plannerDetails={Object.entries(planDetails).map(([planKey, plan]) => {
        const currentPlanKey = planKey as TPlannerPlans;
        if (!shouldRenderPlanDetail(currentPlanKey)) return null;
        return (
          <PlanDetail
            key={planKey}
            subscriptionType={plan.id}
            planDetail={plan}
            billingFrequency={getBillingFrequency(plan.id)}
            setBillingFrequency={(frequency) => setBillingFrequency(plan.id, frequency)}
          />
        );
      })}
      isSelfManaged
      isCompareAllFeaturesSectionOpen={isCompareAllFeaturesSectionOpen}
      setIsCompareAllFeaturesSectionOpen={setIsCompareAllFeaturesSectionOpen}
    />
  );
});
