<script lang="ts">
  import quizzes from "../data.json";
</script>

<div
  class="quizzes-container w-[700px] m-auto flex justify-center h-screen items-center"
>
  {#each quizzes as quiz (quiz.id)}
    <div
      class="quiz-card shadow w-[250px] rounded overflow-hidden cursor-pointer m-2"
    >
      <img class="h-44" src={quiz.imageUrl} alt={quiz.name} />
      <div class="flex items-center justify-between py-3 px-2">
        <h1 class="font-bold">{quiz.name}</h1>
        <p>{quiz.questions.length} questions</p>
      </div>
    </div>
  {/each}
</div>
