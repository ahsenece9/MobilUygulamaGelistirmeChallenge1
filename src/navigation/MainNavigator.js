import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import HomeScreen from '../screens/home/HomeScreen';
import SymptomsScreen from '../screens/symptoms/SymptomsScreen';
import SymptomDetailScreen from '../screens/symptoms/SymptomDetailScreen';
import SymptomTrackingScreen from '../screens/symptoms/SymptomTrackingScreen';
import AskExpertScreen from '../screens/expert/AskExpertScreen';
import PatientExperiencesScreen from '../screens/experiences/PatientExperiencesScreen';
import ExperienceDetailScreen from '../screens/experiences/ExperienceDetailScreen';
import DiseaseInfoScreen from '../screens/about/DiseaseInfoScreen';
import AboutScreen from '../screens/about/AboutScreen';

const Stack = createNativeStackNavigator();

const headerStyle = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.primary,
  headerTitleStyle: { fontWeight: '800' },
  headerShadowVisible: false,
  headerBackTitle: 'Geri',
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerStyle}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Symptoms"
        component={SymptomsScreen}
        options={{ title: 'Belirti Yönetimi' }}
      />
      <Stack.Screen
        name="SymptomDetail"
        component={SymptomDetailScreen}
        options={({ route }) => ({
          title: route.params?.symptom?.title || 'Belirti Detayı',
        })}
      />
      <Stack.Screen
        name="SymptomTracking"
        component={SymptomTrackingScreen}
        options={{ title: 'Belirti Takibi' }}
      />
      <Stack.Screen
        name="AskExpert"
        component={AskExpertScreen}
        options={{ title: 'Uzmana Sor' }}
      />
      <Stack.Screen
        name="PatientExperiences"
        component={PatientExperiencesScreen}
        options={{ title: 'Hasta Deneyimleri' }}
      />
      <Stack.Screen
        name="ExperienceDetail"
        component={ExperienceDetailScreen}
        options={({ route }) => ({
          title: route.params?.experience?.name || 'Deneyim',
        })}
      />
      <Stack.Screen
        name="DiseaseInfo"
        component={DiseaseInfoScreen}
        options={{ title: 'Hastalık Bilgisi' }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'Hakkında' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
