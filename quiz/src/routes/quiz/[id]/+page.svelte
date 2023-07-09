<script lang="ts">
  import QuestionButton from "./components/QuestionButton.svelte";
  import QuestionOption from "./components/QuestionOption.svelte";
  import QuestionText from "./components/QuestionText.svelte";
  import { answers, type Answer } from "../../../store";
  import { onMount, type SvelteComponent_1 } from "svelte";
  import { goto } from "$app/navigation";
  import QuestionProgressCircle from "./components/QuestionProgressCircle.svelte";

  export let data: any;

  let currentQuestionIndex = 0;
  let answersValue: Answer[];
  let selectedOption: null | string = null;
  let showCorrectAnswer = false;

  const handleChangeOption = (label: string) => {
    selectedOption = label;
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    showCorrectAnswer = true;

    answers.update((currentState) => {
      const updatedAnswerState = currentState;

      updatedAnswerState[currentQuestionIndex].isCorrect =
        selectedOption === question.answer;

      return updatedAnswerState;
    });
  };

  const handleNext = () => {
    showCorrectAnswer = false;
    selectedOption = null;

    if (currentQuestionIndex === data.questions.length - 1) {
      goto("/result");
      return;
    }

    currentQuestionIndex++;
  };

  answers.subscribe((value) => {
    answersValue = value;
  });

  $: question = data.questions[currentQuestionIndex];

  onMount(() => {
    answers.set(
      data.questions.map((question: Answer) => {
        return {
          id: question.id,
          isCorrect: null,
        };
      })
    );
  });
</script>

<div class="w-full">
  <div class="flex justify-center">
    {#each answersValue as answer}
      <QuestionProgressCircle isCorrect={answer.isCorrect} />
    {/each}
  </div>
  <QuestionText text={question.question} />
  <div class="flex justify-between flex-wrap">
    {#each question.options as option (option.id)}
      <QuestionOption
        {option}
        {selectedOption}
        {handleChangeOption}
        {showCorrectAnswer}
        answer={question.answer}
      />
    {/each}
  </div>
  <QuestionButton {handleSubmit} {handleNext} {showCorrectAnswer} />
</div>
