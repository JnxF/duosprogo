import create, { GetState, SetState } from 'zustand';
import { data, Translation } from '../Data';
import shuffle from '../utils/shuffle';
import { AnswerScore } from './AnswerScore';
import { ExerciseType } from './ExerciseType';
import { States } from './States';

export type GameState = {
    // General state
    gameState: States;
    modulsActivated: boolean;
    volumeActivated: boolean;

    // Categories
    selectedCategories: string[];

    // Translations
    currentTranslation?: Translation;
    selectedTranslations: Translation[];
    wrongTranslations: Translation[];
    totalTranslations: number;
    completedTranslations: number;
    correctAnswers: number;
    wrongAnswers: number;
    answerScore?: AnswerScore;

    // Current exercise
    exerciseType?: ExerciseType;

    // State mutations
    startGame: () => void;
    checkAnswer: () => void;
    toggleVolume: () => void;
    nextExercise: () => void;

    // Points
    addPositive: () => void;
    addNegative: () => void;
    addConditional: () => void;

    playPositive: () => void;
    playNegative: () => void;

    // Categories
    toggleCategory: (category: string) => void;

    // Reset
    reset: () => void;
};

export const generalState = create<GameState>((set: SetState<GameState>, get: GetState<GameState>) => ({
    // General state
    gameState: States.Jumbotron,
    modulsActivated: true,
    volumeActivated: true,

    // Categories
    selectedCategories: Array.from(new Set(data.map(d => d.category)).values()),

    // Translations
    currentTranslation: undefined,
    selectedTranslations: [],
    wrongTranslations: [],
    totalTranslations: 0,
    completedTranslations: -1,
    correctAnswers: 0,
    wrongAnswers: 0,

    // Current exercise
    exerciseType: undefined,

    // State mutations
    startGame: () => {
        const { selectedCategories } = get();

        let newQuestions = data.filter(t => selectedCategories.includes(t.category));
        shuffle(newQuestions);
        newQuestions = newQuestions.slice(0, 5);

        set({
            gameState: States.RunningExercise,
            modulsActivated: false,
            selectedTranslations: newQuestions,
            totalTranslations: newQuestions.length,
            correctAnswers: 0,
            completedTranslations: -1,
        });
    },

    checkAnswer: () => {
        // Check if the answer is correct
        const { currentTranslation, exerciseType } = get();

        if (exerciseType === ExerciseType.TranslateSentenceExercise) {

            const levenshtein = (a: string, b: string): number => {
                if (a === "" || b === "") return 50;
                const matrix = Array.from({ length: a.length })
                    .map(() => Array.from({ length: b.length })
                        .map(() => 0))
                for (let i = 0; i < a.length; i++) matrix[i][0] = i
                for (let i = 0; i < b.length; i++) matrix[0][i] = i
                for (let j = 0; j < b.length; j++)
                    for (let i = 0; i < a.length; i++)
                        matrix[i][j] = Math.min(
                            (i === 0 ? 0 : matrix[i - 1][j]) + 1,
                            (j === 0 ? 0 : matrix[i][j - 1]) + 1,
                            (i === 0 || j === 0 ? 0 : matrix[i - 1][j - 1]) + (a[i] === b[j] ? 0 : 1)
                        )
                return matrix[a.length - 1][b.length - 1]
            }

            const normalize = (input: string) => {
                let res = input.trim();
                res = res.toLowerCase();
                res = res.replaceAll(/\s+/g, " ");
                return res;
            }

            const areEqual = (a: string, b: string) => {
                const dist = levenshtein(a, b);
                if (dist === 0) return AnswerScore.RIGHT;
                else if (dist <= 2) return AnswerScore.ALMOST;
                return AnswerScore.WRONG;
            }

            let a = normalize((document.getElementById("answer") as HTMLTextAreaElement).value);
            let b = normalize(currentTranslation?.english ?? " ");

            set({ answerScore: areEqual(a, b) });
        }

        set({ gameState: States.CheckingAnswer })
    },

    toggleVolume: (): void => {
        const { volumeActivated } = get();
        set({ volumeActivated: !volumeActivated });
    },

    nextExercise: (): void => {
        const { completedTranslations } = get();
        const { selectedTranslations } = get();
        const { totalTranslations } = get();

        if (completedTranslations === totalTranslations - 1) {
            set({
                gameState: States.FinalSummary
            })
            return;
        }

        // Clear textearea
        const textarea = document.getElementById("answer") as HTMLTextAreaElement;
        if (textarea) {
            textarea.value = "";
        }

        set({
            exerciseType: Math.random() < 0.5 ? ExerciseType.GuessMeaningExercise : ExerciseType.TranslateSentenceExercise,
            completedTranslations: completedTranslations + 1,
            currentTranslation: selectedTranslations.pop(),
            gameState: States.RunningExercise,
        })
    },

    addPositive: (): void => {
        const { correctAnswers } = get();
        const { playPositive } = get();
        const { nextExercise } = get();

        set({ correctAnswers: correctAnswers + 1 });
        playPositive();
        nextExercise();
    },

    addNegative: (): void => {
        const { wrongAnswers } = get();
        const { nextExercise } = get();
        const { playNegative } = get();
        const { wrongTranslations } = get();
        const { currentTranslation } = get();

        set({
            wrongAnswers: wrongAnswers + 1,
            wrongTranslations: [...wrongTranslations as Translation[], currentTranslation as Translation]
        });
        playNegative();
        nextExercise();
    },

    addConditional: (): void => {
        const { answerScore, addPositive, addNegative } = get();
        switch (answerScore) {
            case AnswerScore.RIGHT:
            case AnswerScore.ALMOST:
                addPositive();
                break;
            case AnswerScore.WRONG:
                addNegative();
                break;
            default:
                break;
        }
    },

    playPositive: (): void => { get().volumeActivated && new Audio("correct.wav").play() },
    playNegative: (): void => { get().volumeActivated && new Audio("wrong.wav").play() },

    toggleCategory: (category: string): void => {
        let { selectedCategories } = get();
        if (selectedCategories.includes(category)) {
            selectedCategories = selectedCategories.filter(c => c !== category);
        } else {
            selectedCategories = selectedCategories.concat(category)
        }
        set({ selectedCategories: selectedCategories })
    },

    reset: (): void => {
        set({
            gameState: States.Jumbotron,
            modulsActivated: true,
            volumeActivated: true,

            // Translations
            currentTranslation: undefined,
            selectedTranslations: [],
            wrongTranslations: [],
            totalTranslations: 0,
            completedTranslations: -1,
            correctAnswers: 0,
            wrongAnswers: 0,
        })
    }
}));