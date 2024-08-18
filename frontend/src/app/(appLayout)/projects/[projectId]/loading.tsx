import PageContainer from "@/components/common/PageContainer";
import ProjectLoading from "@/components/project/ProjectLoading";
import ParentPostLoading from "@/components/projectPost/ParentPostLoading";

function LoadingProjectById() {
  return (
    <PageContainer className="w-full max-w-screen-md">
      <section className="mt-2 flex w-full flex-col gap-1 rounded-md border-zinc-300 px-8 py-10 hover:bg-zinc-100 dark:border-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800">
        <div className="flex items-start gap-4">
          <ProjectLoading />
        </div>
      </section>
    </PageContainer>
  );
}

export default LoadingProjectById;
