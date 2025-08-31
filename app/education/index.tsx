import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { 
  BookOpen,
  TrendingUp,
  DollarSign,
  PieChart,
  Shield,
  Target,
  Clock,
  Star,
  Play,
  FileText,
  Award,
  Users,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  price: string;
  description: string;
  color: string;
}

export default function EducationScreen() {
  const { theme } = useTheme();
  
  const [selectedTab, setSelectedTab] = useState<'articles' | 'courses'>('articles');
  
  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'Investment Basics: Getting Started',
      category: 'Fundamentals',
      readTime: '5 min read',
      difficulty: 'Beginner',
      rating: 4.8,
      description: 'Learn the fundamental concepts of investing, risk management, and building your first portfolio.',
      icon: BookOpen,
      color: '#4F46E5',
      isNew: true,
    },
    {
      id: '2',
      title: 'Understanding Mutual Funds',
      category: 'Investment Types',
      readTime: '8 min read',
      difficulty: 'Beginner',
      rating: 4.6,
      description: 'Complete guide to mutual funds, SIPs, and how to choose the right funds for your goals.',
      icon: PieChart,
      color: '#059669',
      isPopular: true,
    },
    {
      id: '3',
      title: 'Stock Market Analysis Techniques',
      category: 'Advanced Strategies',
      readTime: '12 min read',
      difficulty: 'Advanced',
      rating: 4.9,
      description: 'Learn technical and fundamental analysis to make informed stock investment decisions.',
      icon: TrendingUp,
      color: '#DC2626',
    },
    {
      id: '4',
      title: 'Tax-Saving Investment Options',
      category: 'Tax Planning',
      readTime: '6 min read',
      difficulty: 'Intermediate',
      rating: 4.7,
      description: 'Explore ELSS, PPF, NSC and other tax-saving instruments under Section 80C.',
      icon: Shield,
      color: '#7C3AED',
      isNew: true,
    },
    {
      id: '5',
      title: 'Retirement Planning Strategies',
      category: 'Financial Planning',
      readTime: '10 min read',
      difficulty: 'Intermediate',
      rating: 4.8,
      description: 'Build a comprehensive retirement plan with the right mix of investments and insurance.',
      icon: Target,
      color: '#EA580C',
      isPopular: true,
    },
    {
      id: '6',
      title: 'Real Estate Investment Guide',
      category: 'Alternative Investments',
      readTime: '15 min read',
      difficulty: 'Advanced',
      rating: 4.5,
      description: 'Everything you need to know about investing in real estate and REITs.',
      icon: DollarSign,
      color: '#10B981',
    },
  ]);

  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete Investment Masterclass',
      instructor: 'Rajesh Kumar',
      duration: '8 hours',
      lessons: 24,
      students: 1250,
      rating: 4.9,
      price: '₹2,999',
      description: 'Master the art of investing with this comprehensive course covering stocks, bonds, mutual funds, and more.',
      color: '#4F46E5',
    },
    {
      id: '2',
      title: 'Personal Finance Management',
      instructor: 'Priya Sharma',
      duration: '6 hours',
      lessons: 18,
      students: 890,
      rating: 4.7,
      price: '₹1,999',
      description: 'Learn budgeting, saving, and financial planning to achieve your life goals.',
      color: '#059669',
    },
    {
      id: '3',
      title: 'Advanced Trading Strategies',
      instructor: 'Amit Patel',
      duration: '12 hours',
      lessons: 36,
      students: 650,
      rating: 4.8,
      price: '₹4,999',
      description: 'Advanced course on options, futures, and derivatives trading strategies.',
      color: '#DC2626',
    },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#10B981';
      case 'Intermediate':
        return '#F59E0B';
      case 'Advanced':
        return '#EF4444';
      default:
        return theme.colors.textSecondary;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={12} color="#F59E0B" fill="#F59E0B" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={12} color="#F59E0B" fill="#F59E0B" />
      );
    }

    return stars;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen 
        options={{ 
          title: 'Education Center',
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
                Learn & Grow
              </Text>
              <View style={[styles.progressBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                <Award size={16} color={theme.colors.primary} />
                <Text style={[styles.progressBadgeText, { color: theme.colors.primary }]}>
                  Level 3
                </Text>
              </View>
            </View>
            
            <Text style={[styles.overviewDescription, { color: theme.colors.textSecondary }]}>
              Enhance your financial knowledge with our curated content and expert-led courses
            </Text>
            
            <View style={styles.overviewStats}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>12</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Articles Read</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>3</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Courses Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>45h</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Learning Time</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Tab Navigation */}
        <View style={[styles.tabContainer, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'articles' && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedTab('articles')}
          >
            <FileText size={20} color={selectedTab === 'articles' ? theme.colors.surface : theme.colors.textSecondary} />
            <Text style={[
              styles.tabText,
              { color: selectedTab === 'articles' ? theme.colors.surface : theme.colors.textSecondary }
            ]}>
              Articles
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'courses' && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedTab('courses')}
          >
            <Play size={20} color={selectedTab === 'courses' ? theme.colors.surface : theme.colors.textSecondary} />
            <Text style={[
              styles.tabText,
              { color: selectedTab === 'courses' ? theme.colors.surface : theme.colors.textSecondary }
            ]}>
              Courses
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          {selectedTab === 'articles' ? (
            <>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Featured Articles</Text>
              
              {articles.map((article) => {
                const IconComponent = article.icon;
                return (
                  <TouchableOpacity
                    key={article.id}
                    style={[styles.articleCard, { backgroundColor: theme.colors.surface }]}
                  >
                    <View style={styles.articleHeader}>
                      <View style={[styles.articleIcon, { backgroundColor: article.color + '20' }]}>
                        <IconComponent size={24} color={article.color} />
                      </View>
                      <View style={styles.articleInfo}>
                        <View style={styles.articleTitleRow}>
                          <Text style={[styles.articleTitle, { color: theme.colors.text }]}>{article.title}</Text>
                          {article.isNew && (
                            <View style={[styles.badge, { backgroundColor: '#10B981' }]}>
                              <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>NEW</Text>
                            </View>
                          )}
                          {article.isPopular && (
                            <View style={[styles.badge, { backgroundColor: '#F59E0B' }]}>
                              <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>POPULAR</Text>
                            </View>
                          )}
                        </View>
                        <Text style={[styles.articleCategory, { color: theme.colors.textSecondary }]}>{article.category}</Text>
                      </View>
                    </View>

                    <Text style={[styles.articleDescription, { color: theme.colors.textSecondary }]}>
                      {article.description}
                    </Text>

                    <View style={styles.articleFooter}>
                      <View style={styles.articleMeta}>
                        <View style={styles.metaItem}>
                          <Clock size={14} color={theme.colors.textSecondary} />
                          <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{article.readTime}</Text>
                        </View>
                        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(article.difficulty) + '20' }]}>
                          <Text style={[styles.difficultyText, { color: getDifficultyColor(article.difficulty) }]}>
                            {article.difficulty}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.ratingContainer}>
                        <View style={styles.stars}>
                          {renderStars(article.rating)}
                        </View>
                        <Text style={[styles.ratingText, { color: theme.colors.textSecondary }]}>{article.rating}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </>
          ) : (
            <>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Premium Courses</Text>
              
              {courses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  style={[styles.courseCard, { backgroundColor: theme.colors.surface }]}
                >
                  <View style={[styles.courseHeader, { backgroundColor: course.color + '15' }]}>
                    <View style={styles.courseInfo}>
                      <Text style={[styles.courseTitle, { color: theme.colors.text }]}>{course.title}</Text>
                      <Text style={[styles.courseInstructor, { color: theme.colors.textSecondary }]}>by {course.instructor}</Text>
                    </View>
                    <Text style={[styles.coursePrice, { color: course.color }]}>{course.price}</Text>
                  </View>

                  <Text style={[styles.courseDescription, { color: theme.colors.textSecondary }]}>
                    {course.description}
                  </Text>

                  <View style={styles.courseStats}>
                    <View style={styles.statRow}>
                      <View style={styles.courseMeta}>
                        <Clock size={14} color={theme.colors.textSecondary} />
                        <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{course.duration}</Text>
                      </View>
                      <View style={styles.courseMeta}>
                        <BookOpen size={14} color={theme.colors.textSecondary} />
                        <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{course.lessons} lessons</Text>
                      </View>
                      <View style={styles.courseMeta}>
                        <Users size={14} color={theme.colors.textSecondary} />
                        <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{course.students} students</Text>
                      </View>
                    </View>
                    <View style={styles.ratingContainer}>
                      <View style={styles.stars}>
                        {renderStars(course.rating)}
                      </View>
                      <Text style={[styles.ratingText, { color: theme.colors.textSecondary }]}>{course.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
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
    marginBottom: 8,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  progressBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  overviewDescription: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  articleCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  articleHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  articleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  articleCategory: {
    fontSize: 12,
  },
  articleDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
  },
  courseCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 12,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDescription: {
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    gap: 16,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});