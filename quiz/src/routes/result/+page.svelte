<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { answers, type Answer } from "../../store";

  let answersValue: Answer[] = [];

  answers.subscribe((value) => {
    answersValue = value;
  });

  const numberOfCorrectAnswers = answersValue.reduce((acc, cur) => {
    if (cur.isCorrect === true) {
      return ++acc;
    }

    return acc;
  }, 0);

  const numberOfQuestions = answersValue.length;

  const handleBack = () => {
    answers.set([]);
    goto("/");
  };

  onMount(() => {
    if (!answersValue.length) goto("/");
  });
</script>

<div class="text-center">
  <h3 class="text-9xl mb-2">
    {((numberOfCorrectAnswers / numberOfQuestions) * 100).toFixed(0)}%
  </h3>
  <p class="text-3xl mb-3">{numberOfCorrectAnswers}/{numberOfQuestions}</p>
  <button
    class="bg-blue-900 text-white font-bold p-4 rounded px-8 m-3"
    on:click={handleBack}>Go Back</button
  >
</div>
