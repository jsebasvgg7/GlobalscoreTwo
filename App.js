import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { supabase } from './src/utils/supabaseClient';

const Tab = createBottomTabNavigator();

// Pantallas temporales — las reemplazaremos una por una
function PlaceholderScreen({ name }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.center, { backgroundColor: colors.bg }]}>
      <Text style={{ color: colors.accentLight, fontSize: 18, fontWeight: '500' }}>
        {name}
      </Text>
      <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 8 }}>
        En construcción
      </Text>
    </View>
  );
}

function DashboardScreen() { return <PlaceholderScreen name="Dashboard" />; }
function RankingScreen()   { return <PlaceholderScreen name="Ranking" />; }
function StatsScreen()     { return <PlaceholderScreen name="Stats" />; }
function ProfileScreen()   { return <PlaceholderScreen name="Perfil" />; }

function MainTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: colors.accentLight,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tab.Screen name="Inicio"   component={DashboardScreen} />
      <Tab.Screen name="Ranking"  component={RankingScreen} />
      <Tab.Screen name="Stats"    component={StatsScreen} />
      <Tab.Screen name="Perfil"   component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { colors } = useTheme();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={{ color: colors.textSecondary, marginTop: 12 }}>
          Cargando GlobalScore...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {session ? <MainTabs /> : <PlaceholderScreen name="Login — próximamente" />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});