import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { 
  Building2,
  PiggyBank,
  TrendingUp,
  Plus,
  ChevronRight,
  Banknote,
  Calendar,

  X
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: 'Savings' | 'Current';
  balance: number;
  savings: SavingsAccount[];
  fixedDeposits: FixedDeposit[];
}

interface SavingsAccount {
  id: string;
  accountNumber: string;
  balance: number;
  interestRate: number;
  accountType: string;
}

interface FixedDeposit {
  id: string;
  fdNumber: string;
  principal: number;
  interestRate: number;
  maturityDate: string;
  maturityAmount: number;
  tenure: string;
}

const mockBankAccounts: BankAccount[] = [
  {
    id: '1',
    bankName: 'HDFC Bank',
    accountNumber: '****1234',
    accountType: 'Savings',
    balance: 125000,
    savings: [
      {
        id: 's1',
        accountNumber: '50100012345678',
        balance: 125000,
        interestRate: 3.5,
        accountType: 'Regular Savings'
      },
      {
        id: 's2',
        accountNumber: '50100087654321',
        balance: 75000,
        interestRate: 4.0,
        accountType: 'Premium Savings'
      }
    ],
    fixedDeposits: [
      {
        id: 'fd1',
        fdNumber: 'FD001234567',
        principal: 200000,
        interestRate: 6.5,
        maturityDate: '2025-03-15',
        maturityAmount: 226000,
        tenure: '2 Years'
      },
      {
        id: 'fd2',
        fdNumber: 'FD001234568',
        principal: 150000,
        interestRate: 7.0,
        maturityDate: '2024-12-20',
        maturityAmount: 171000,
        tenure: '1.5 Years'
      }
    ]
  },
  {
    id: '2',
    bankName: 'ICICI Bank',
    accountNumber: '****5678',
    accountType: 'Savings',
    balance: 85000,
    savings: [
      {
        id: 's3',
        accountNumber: '019801234567',
        balance: 85000,
        interestRate: 3.25,
        accountType: 'Regular Savings'
      }
    ],
    fixedDeposits: [
      {
        id: 'fd3',
        fdNumber: 'FD987654321',
        principal: 300000,
        interestRate: 6.75,
        maturityDate: '2025-06-10',
        maturityAmount: 340500,
        tenure: '2 Years'
      }
    ]
  },
  {
    id: '3',
    bankName: 'SBI',
    accountNumber: '****9012',
    accountType: 'Savings',
    balance: 40000,
    savings: [
      {
        id: 's4',
        accountNumber: '30123456789',
        balance: 40000,
        interestRate: 2.75,
        accountType: 'Basic Savings'
      }
    ],
    fixedDeposits: []
  }
];

export default function BankAccountsScreen() {
  const { theme } = useTheme();
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const totalBalance = mockBankAccounts.reduce((sum, bank) => sum + bank.balance, 0);
  const totalFDs = mockBankAccounts.reduce((sum, bank) => 
    sum + bank.fixedDeposits.reduce((fdSum, fd) => fdSum + fd.principal, 0), 0
  );


  const openBankDetails = (bank: BankAccount) => {
    setSelectedBank(bank);
    setModalVisible(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen 
        options={{
          title: 'Bank Accounts',
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <StatusBar barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
      
      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.summaryIcon, { backgroundColor: theme.colors.primary + '15' }]}>
            <Banknote size={20} color={theme.colors.primary} />
          </View>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Balance</Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{formatCurrency(totalBalance)}</Text>
        </View>
        
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.summaryIcon, { backgroundColor: theme.colors.success + '15' }]}>
            <PiggyBank size={20} color={theme.colors.success} />
          </View>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Fixed Deposits</Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{formatCurrency(totalFDs)}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Banks</Text>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.colors.primary }]}>
            <Plus size={16} color="white" />
          </TouchableOpacity>
        </View>

        {mockBankAccounts.map((bank) => {
          const totalBankFDs = bank.fixedDeposits.reduce((sum, fd) => sum + fd.principal, 0);
          const totalBankSavings = bank.savings.reduce((sum, sav) => sum + sav.balance, 0);
          
          return (
            <TouchableOpacity
              key={bank.id}
              style={[styles.bankCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
              onPress={() => openBankDetails(bank)}
              testID={`bank-${bank.id}`}
            >
              <View style={styles.bankCardHeader}>
                <View style={styles.bankInfo}>
                  <View style={[styles.bankIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                    <Building2 size={24} color={theme.colors.primary} />
                  </View>
                  <View style={styles.bankDetails}>
                    <Text style={[styles.bankName, { color: theme.colors.text }]}>{bank.bankName}</Text>
                    <Text style={[styles.accountNumber, { color: theme.colors.textSecondary }]}>
                      {bank.accountType} • {bank.accountNumber}
                    </Text>
                  </View>
                </View>
                <ChevronRight size={20} color={theme.colors.textSecondary} />
              </View>
              
              <View style={styles.bankStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Balance</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{formatCurrency(totalBankSavings)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Fixed Deposits</Text>
                  <Text style={[styles.statValue, { color: theme.colors.success }]}>{formatCurrency(totalBankFDs)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Accounts</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{bank.savings.length + bank.fixedDeposits.length}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bank Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {selectedBank?.bankName}
              </Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={[styles.closeButton, { backgroundColor: theme.colors.background }]}
              >
                <X size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {/* Savings Accounts */}
              {selectedBank && selectedBank.savings.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, { color: theme.colors.text }]}>Savings Accounts</Text>
                  {selectedBank.savings.map((savings) => (
                    <View key={savings.id} style={[styles.accountItem, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
                      <View style={styles.accountHeader}>
                        <View style={[styles.accountIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                          <PiggyBank size={16} color={theme.colors.primary} />
                        </View>
                        <View style={styles.accountInfo}>
                          <Text style={[styles.accountType, { color: theme.colors.text }]}>{savings.accountType}</Text>
                          <Text style={[styles.accountNum, { color: theme.colors.textSecondary }]}>{savings.accountNumber}</Text>
                        </View>
                      </View>
                      <View style={styles.accountStats}>
                        <View style={styles.accountStat}>
                          <Text style={[styles.accountStatLabel, { color: theme.colors.textSecondary }]}>Balance</Text>
                          <Text style={[styles.accountStatValue, { color: theme.colors.text }]}>{formatCurrency(savings.balance)}</Text>
                        </View>
                        <View style={styles.accountStat}>
                          <Text style={[styles.accountStatLabel, { color: theme.colors.textSecondary }]}>Interest Rate</Text>
                          <Text style={[styles.accountStatValue, { color: theme.colors.success }]}>{savings.interestRate}% p.a.</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Fixed Deposits */}
              {selectedBank && selectedBank.fixedDeposits.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, { color: theme.colors.text }]}>Fixed Deposits</Text>
                  {selectedBank.fixedDeposits.map((fd) => (
                    <View key={fd.id} style={[styles.accountItem, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
                      <View style={styles.accountHeader}>
                        <View style={[styles.accountIcon, { backgroundColor: theme.colors.success + '15' }]}>
                          <TrendingUp size={16} color={theme.colors.success} />
                        </View>
                        <View style={styles.accountInfo}>
                          <Text style={[styles.accountType, { color: theme.colors.text }]}>Fixed Deposit</Text>
                          <Text style={[styles.accountNum, { color: theme.colors.textSecondary }]}>{fd.fdNumber}</Text>
                        </View>
                      </View>
                      <View style={styles.fdDetails}>
                        <View style={styles.fdRow}>
                          <View style={styles.fdStat}>
                            <Text style={[styles.fdLabel, { color: theme.colors.textSecondary }]}>Principal</Text>
                            <Text style={[styles.fdValue, { color: theme.colors.text }]}>{formatCurrency(fd.principal)}</Text>
                          </View>
                          <View style={styles.fdStat}>
                            <Text style={[styles.fdLabel, { color: theme.colors.textSecondary }]}>Rate</Text>
                            <Text style={[styles.fdValue, { color: theme.colors.success }]}>{fd.interestRate}%</Text>
                          </View>
                        </View>
                        <View style={styles.fdRow}>
                          <View style={styles.fdStat}>
                            <Text style={[styles.fdLabel, { color: theme.colors.textSecondary }]}>Maturity</Text>
                            <Text style={[styles.fdValue, { color: theme.colors.text }]}>{formatDate(fd.maturityDate)}</Text>
                          </View>
                          <View style={styles.fdStat}>
                            <Text style={[styles.fdLabel, { color: theme.colors.textSecondary }]}>Maturity Amount</Text>
                            <Text style={[styles.fdValue, { color: theme.colors.success }]}>{formatCurrency(fd.maturityAmount)}</Text>
                          </View>
                        </View>
                        <View style={[styles.tenureChip, { backgroundColor: theme.colors.primary + '15' }]}>
                          <Calendar size={12} color={theme.colors.primary} />
                          <Text style={[styles.tenureText, { color: theme.colors.primary }]}>{fd.tenure}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bankCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bankIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bankDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  accountNumber: {
    fontSize: 12,
  },
  bankStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScroll: {
    flex: 1,
  },
  modalSection: {
    padding: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  accountItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  accountIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  accountInfo: {
    flex: 1,
  },
  accountType: {
    fontSize: 14,
    fontWeight: '600',
  },
  accountNum: {
    fontSize: 11,
    marginTop: 2,
  },
  accountStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountStat: {
    flex: 1,
  },
  accountStatLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  accountStatValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  fdDetails: {
    marginTop: 4,
  },
  fdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fdStat: {
    flex: 1,
  },
  fdLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  fdValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  tenureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  tenureText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
});