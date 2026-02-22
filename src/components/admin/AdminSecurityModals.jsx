import React, { useState } from 'react';
import AdminSettingsModal from './AdminSettingsModal';
import PasswordForm from './PasswordForm';
import EmailForm from './EmailForm';
import { API_ENDPOINTS } from '../../utils/api';

const AdminSecurityModals = ({
    showPasswordForm,
    setShowPasswordForm,
    showEmailForm,
    setShowEmailForm,
    getAuthHeaders,
    onLogout
}) => {
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [emailData, setEmailData] = useState({ currentPassword: '', newEmail: '' });
    const [emailLoading, setEmailLoading] = useState(false);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        setPasswordLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.admin.changePassword, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
            });
            if (response.ok) {
                alert('Password changed successfully');
                setShowPasswordForm(false);
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                const data = await response.json();
                alert(data.error);
            }
        } catch (error) {
            alert('Failed to change password');
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setEmailLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.admin.changeEmail, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify({ currentPassword: emailData.currentPassword, newEmail: emailData.newEmail })
            });
            if (response.ok) {
                alert('Email changed successfully');
                setShowEmailForm(false);
                setEmailData({ currentPassword: '', newEmail: '' });
            } else {
                const data = await response.json();
                alert(data.error);
            }
        } catch (error) {
            alert('Failed to change email');
        } finally {
            setEmailLoading(false);
        }
    };

    return (
        <>
            <AdminSettingsModal
                title="Admin Security"
                isOpen={showPasswordForm}
                onClose={() => { setShowPasswordForm(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); }}
            >
                <PasswordForm
                    passwordData={passwordData}
                    setPasswordData={setPasswordData}
                    onSubmit={handlePasswordSubmit}
                    onCancel={() => { setShowPasswordForm(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); }}
                    loading={passwordLoading}
                />
            </AdminSettingsModal>

            <AdminSettingsModal
                title="Account Settings"
                isOpen={showEmailForm}
                onClose={() => { setShowEmailForm(false); setEmailData({ currentPassword: '', newEmail: '' }); }}
            >
                <EmailForm
                    emailData={emailData}
                    setEmailData={setEmailData}
                    onSubmit={handleEmailSubmit}
                    onCancel={() => { setShowEmailForm(false); setEmailData({ currentPassword: '', newEmail: '' }); }}
                    loading={emailLoading}
                />
            </AdminSettingsModal>
        </>
    );
};

export default AdminSecurityModals;
