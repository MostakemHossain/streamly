"use client";

import { FilterCarousel } from "@/components/filter-carosel";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
interface CategorySectionProps {
  categoryId?: string;
}

export const CategorySection = ({ categoryId }: CategorySectionProps) => {
  return (
    <Suspense fallback={<FilterCarousel
      onSelect={() => {}}
      isLoading
      data={[]}
    />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <CategorySectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategorySectionSuspense = ({ categoryId }: CategorySectionProps) => {
  const router= useRouter();
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const data = categories.map(({ name, id }) => {
    return { label: name, value: id };
  });
  const onSelect=(value:string |null)=>{
    const url= new URL(window.location.href);
    if(value){
      url.searchParams.set("categoryId", value);
     
    }else{
      url.searchParams.delete("categoryId");
    }
    router.push(url.toString());
  }
  return (
    <FilterCarousel
      onSelect={onSelect}
      value={categoryId}
      data={data}
    />
  );
};
