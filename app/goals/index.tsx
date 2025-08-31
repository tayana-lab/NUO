import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { 
  Target,
  Home as HomeIcon,
  BookOpen,
  Shield,
  Plus,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface Goal {
  id: string;
  title: string;
  targetAmount: string;
  currentAmount: string;
  progress: number;
  targetDate: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  monthlyContribution: string;
  timeRemaining: string;
  status: 'on-track' | 'behind' | 'ahead' | 'completed';
}

export default function GoalsScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const [goals] = useState<Goal[]>([
    {
      id: '1',
      title: t.goals.retirement,
      targetAmount: '₹2,00,00,000',
      currentAmount: '₹1,30,00,000',
      progress: 65,
      targetDate: 'Dec 2045',
      category: t.goals.retirement,
      icon: Target,
      color: '#4F46E5',
      monthlyContribution: '₹25,000',
      timeRemaining: '21 years',
      status: 'on-track'
    },
    {
      id: '2',
      title: t.goals.house,
      targetAmount: '₹1,50,00,000',
      currentAmount: '₹67,50,000',
      progress: 45,
      targetDate: 'Jun 2028',
      category: 'Property',
      icon: HomeIcon,
      color: '#059669',
      monthlyContribution: '₹35,000',
      timeRemaining: '4 years',
      status: 'behind'
    },
    {
      id: '3',
      title: t.goals.education,
      targetAmount: '₹50,00,000',
      currentAmount: '₹39,00,000',
      progress: 78,
      targetDate: 'Apr 2030',
      category: t.goals.education,
      icon: BookOpen,
      color: '#DC2626',
      monthlyContribution: '₹15,000',
      timeRemaining: '6 years',
      status: 'ahead'
    },
    {
      id: '4',
      title: t.goals.vacation,
      targetAmount: '₹10,00,000',
      currentAmount: '₹3,20,000',
      progress: 32,
      targetDate: 'Dec 2026',
      category: 'Travel',
      icon: Target,
      color: '#7C3AED',
      monthlyContribution: '₹12,000',
      timeRemaining: '2 years',
      status: 'on-track'
    },
    {
      id: '5',
      title: t.goals.emergency,
      targetAmount: '₹15,00,000',
      currentAmount: '₹13,50,000',
      progress: 90,
      targetDate: 'Mar 2025',
      category: 'Security',
      icon: Shield,
      color: '#EA580C',
      monthlyContribution: '₹8,000',
      timeRemaining: '4 months',
      status: 'ahead'
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'ahead':
        return '#10B981';
      case 'on-track':
        return theme.colors.primary;
      case 'behind':
        return '#EF4444';
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'ahead':
        return 'Ahead of Schedule';
      case 'on-track':
        return 'On Track';
      case 'behind':
        return 'Behind Schedule';
      default:
        return 'Unknown';
    }
  };

  const totalGoalValue = '₹6,25,00,000';
  const totalCurrentValue = '₹2,53,20,000';
  const overallProgress = 41;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen 
        options={{ 
          title: t.goals.financialGoals,
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Overview Card */}
        <View style={[styles.overviewCard, { backgroundColor: theme.colors.surface }]}>
          <LinearGradient
            colors={[theme.colors.primary + '15', theme.colors.secondary + '10', theme.colors.surface]}
            style={styles.overviewGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.overviewHeader}>
              <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>
                Goals Overview
              </Text>
              <View style={[styles.progressBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                <Text style={[styles.progressBadgeText, { color: theme.colors.primary }]}>
                  {overallProgress}% Complete
                </Text>
              </View>
            </View>
            
            <View style={styles.overviewStats}>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{t.goals.targetAmount}</Text>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{totalGoalValue}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{t.goals.currentAmount}</Text>
                <Text style={[styles.statValue, { color: theme.colors.success }]}>{totalCurrentValue}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Active Goals</Text>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{goals.length}</Text>
              </View>
            </View>
            
            <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.progressFill, { backgroundColor: theme.colors.primary, width: `${overallProgress}%` }]} />
            </View>
          </LinearGradient>
        </View>

        {/* Add New Goal Button */}
        <TouchableOpacity 
          style={[styles.addGoalButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => router.push('/calculators')}
        >
          <Plus size={20} color={theme.colors.surface} />
          <Text style={[styles.addGoalText, { color: theme.colors.surface }]}>{t.goals.addGoal}</Text>
        </TouchableOpacity>

        {/* Goals List */}
        <View style={styles.goalsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Goals</Text>
          
          {goals.map((goal) => {
            const IconComponent = goal.icon;
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalCard, { backgroundColor: theme.colors.surface }]}
              >
                <View style={styles.goalHeader}>
                  <View style={styles.goalTitleRow}>
                    <View style={[styles.goalIcon, { backgroundColor: goal.color + '20' }]}>
                      <IconComponent size={24} color={goal.color} />
                    </View>
                    <View style={styles.goalInfo}>
                      <Text style={[styles.goalTitle, { color: theme.colors.text }]}>{goal.title}</Text>
                      <Text style={[styles.goalCategory, { color: theme.colors.textSecondary }]}>{goal.category}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(goal.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(goal.status) }]}>
                        {getStatusText(goal.status)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.goalProgress}>
                  <View style={styles.progressInfo}>
                    <Text style={[styles.currentAmount, { color: theme.colors.text }]}>{goal.currentAmount}</Text>
                    <Text style={[styles.targetAmount, { color: theme.colors.textSecondary }]}>of {goal.targetAmount}</Text>
                  </View>
                  <Text style={[styles.progressPercentage, { color: goal.color }]}>{goal.progress}%</Text>
                </View>

                <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                  <View style={[styles.progressFill, { backgroundColor: goal.color, width: `${goal.progress}%` }]} />
                </View>

                <View style={styles.goalDetails}>
                  <View style={styles.detailItem}>
                    <Calendar size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{goal.targetDate}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <DollarSign size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{goal.monthlyContribution}/month</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{goal.timeRemaining} left</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  overviewCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  overviewGradient: {
    padding: 20,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addGoalText: {
    fontSize: 16,
    fontWeight: '600',
  },
  goalsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  goalCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  goalHeader: {
    marginBottom: 16,
  },
  goalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalInfo: {
    flex: 1,
    marginLeft: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  goalCategory: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  goalProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressInfo: {
    flex: 1,
  },
  currentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  targetAmount: {
    fontSize: 12,
    marginTop: 2,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 11,
  },
});