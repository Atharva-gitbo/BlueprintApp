import { createBrowserRouter, redirect } from 'react-router';
import { BlueprintFrame } from './components/BlueprintFrame';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { MoodboardBuilderScreen } from './components/screens/MoodboardBuilderScreen';
import { MoodboardQuestionnaireScreen } from './components/screens/MoodboardQuestionnaireScreen';
import { PrioritizeGoalsScreen } from './components/screens/PrioritizeGoalsScreen';
import { CanvasCompleteScreen } from './components/screens/CanvasCompleteScreen';
import { CanvasHomeScreen } from './components/screens/CanvasHomeScreen';
import { AreaDetailScreen } from './components/screens/AreaDetailScreen';
import { GapViewScreen } from './components/screens/GapViewScreen';
import { WeeklyActionsScreen } from './components/screens/WeeklyActionsScreen';
import { MonthlyCheckinScreen } from './components/screens/MonthlyCheckinScreen';
import { LifeInvestmentScreen } from './components/screens/LifeInvestmentScreen';
import { CanvasEditScreen } from './components/screens/CanvasEditScreen';
import { WeeklyReflectionScreen } from './components/screens/WeeklyReflectionScreen';
import { PulseScreen } from './components/screens/PulseScreen';
import { OnboardingNewScreen } from './components/screens/OnboardingNewScreen';
import { InsightsScreen } from './components/screens/InsightsScreen';
import { YearInAlignmentScreen } from './components/screens/YearInAlignmentScreen';
import { DirectionsScreen } from './components/screens/DirectionsScreen';

const toHome = () => redirect('/home');

export const router = createBrowserRouter([
  {
    path: '/',
    Component: BlueprintFrame,
    children: [
      { index: true, Component: OnboardingNewScreen },
      { path: 'moodboard', Component: MoodboardBuilderScreen },
      { path: 'moodboard-questions', Component: MoodboardQuestionnaireScreen },
      { path: 'prioritize', Component: PrioritizeGoalsScreen },
      { path: 'home', Component: PulseScreen },
      { path: 'directions', Component: DirectionsScreen },
      { path: 'builder-complete', Component: CanvasCompleteScreen },
      { path: 'area/:id', Component: AreaDetailScreen },
      { path: 'gap', Component: GapViewScreen },
      { path: 'gap-overview', loader: toHome },
      { path: 'weekly', Component: WeeklyActionsScreen },
      { path: 'reflect', Component: WeeklyReflectionScreen },
      { path: 'checkin', Component: MonthlyCheckinScreen },
      { path: 'investment', Component: LifeInvestmentScreen },
      { path: 'canvas-edit', Component: CanvasEditScreen },
      { path: 'insights', Component: InsightsScreen },
      { path: 'year', Component: YearInAlignmentScreen },
      { path: '*', loader: toHome },
    ],
  },
]);