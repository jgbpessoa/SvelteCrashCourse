<script lang="ts">
  import { goto } from "$app/navigation";
  interface Quiz {
    id: number;
    name: string;
    imageUrl: string;
    questions: {
      id: number;
      question: string;
      options: { id: number; label: string; text: string }[];
      answer: string;
    }[];
  }

  export let quiz: Quiz;
</script>

<button
  class="quiz-card shadow w-[250px] rounded overflow-hidden cursor-pointer m-2"
  on:click={() => goto(`/quiz/${quiz.id}`)}
>
  <img class="h-44" src={quiz.imageUrl} alt={quiz.name} />
  <div class="flex items-center justify-between py-3 px-2">
    <h1 class="font-bold">{quiz.name}</h1>
    <p>{quiz.questions.length} questions</p>
  </div>
</button>
