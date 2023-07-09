<script lang="ts">
  import QuestionButton from "./components/QuestionButton.svelte";
  import QuestionOption from "./components/QuestionOption.svelte";
  import QuestionText from "./components/QuestionText.svelte";
  import { answers, type Answer } from "../../../store";

  export let data: any;

  let currentQuestionIndex = 0;
  let answersValue: Answer[];

  answers.subscribe((value) => {
    answersValue = value;
  });

  $: question = data.questions[currentQuestionIndex];
</script>

<div class="w-full">
  <QuestionText text={question.question} />
  <div class="flex justify-between flex-wrap">
    {#each question.options as option (option.id)}
      <QuestionOption {option} />
    {/each}
  </div>
  <QuestionButton />
</div>
