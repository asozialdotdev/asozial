import PageContainer from "@/components/common/PageContainer";
import ParentPostLoading from "@/components/post/ParentPostLoading";

function LoadingProjectById() {
  return (
    <PageContainer className="w-full max-w-screen-md">
      <section className="flex w-full flex-col gap-1 rounded-md mt-2 border-zinc-300 px-8 py-10 hover:bg-zinc-100 dark:border-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800">
        <div className="flex items-start gap-4">
          <ParentPostLoading />
        </div>
      </section>
    </PageContainer>
  );
}

export default LoadingProjectById;
