import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface UserFeedbackProps {
  visible: boolean;
  onClose: () => void;
  feedbackType?: 'bug' | 'feature' | 'general';
}

const UserFeedback: React.FC<UserFeedbackProps> = ({ 
  visible, 
  onClose, 
  feedbackType = 'general' 
}) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please provide your feedback before submitting.');
      return;
    }

    const subject = encodeURIComponent(`Shabbos Weather App Feedback - ${feedbackType}`);
    const body = encodeURIComponent(
      `Feedback Type: ${feedbackType}\n\nUser Feedback:\n${feedback}\n\nUser Email: ${email || 'Not provided'}\n\nApp Version: 1.0.0\nPlatform: ${Platform.OS}`
    );
    
                const supportEmail = process.env.SUPPORT_EMAIL || "admin@shabbosweather.com";
            const mailtoUrl = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    
    Alert.alert(
      'Submit Feedback',
      'Would you like to send this feedback to our support team?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Email', 
          onPress: () => {
            Linking.openURL(mailtoUrl);
            handleClose();
          }
        }
      ]
    );
  };

  const handleClose = () => {
    setFeedback('');
    setEmail('');
    onClose();
  };

  const getFeedbackTitle = () => {
    switch (feedbackType) {
      case 'bug':
        return 'Report a Bug';
      case 'feature':
        return 'Request a Feature';
      default:
        return 'Send Feedback';
    }
  };

  const getFeedbackPlaceholder = () => {
    switch (feedbackType) {
      case 'bug':
        return 'Please describe the bug you encountered, including what you were doing when it happened...';
      case 'feature':
        return 'Please describe the feature you would like to see added to the app...';
      default:
        return 'Please share your thoughts, suggestions, or any issues you encountered...';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{getFeedbackTitle()}</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.description}>
            We value your feedback! Please let us know about any issues you&apos;ve encountered or suggestions you have for improving the app.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Feedback *</Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder={getFeedbackPlaceholder()}
              placeholderTextColor="#999"
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Email (optional)</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="your.email@example.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>
              Providing your email allows us to follow up with you if needed.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.submitButton, !feedback.trim() && styles.submitButtonDisabled]} 
              onPress={handleSubmit}
              disabled={!feedback.trim()}
            >
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#6c757d',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 22,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 120,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  helperText: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ced4da',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default UserFeedback; 