import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, Clock, CheckCircle2 } from 'lucide-react';
import { getContacts, updateContactStatus } from '../../services/api';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data || []);
    } catch (err) {
      console.error(err);
      showToast('Lỗi khi tải danh sách liên hệ');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleMarkContacted = async (id) => {
    try {
      await updateContactStatus(id, 'contacted');
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status: 'contacted' } : c));
      showToast('Đã đánh dấu là đã liên hệ');
    } catch (err) {
      console.error(err);
      showToast('Lỗi khi cập nhật trạng thái');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171717] text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 border border-stone-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#171717]">Quản Lý Yêu Cầu Liên Hệ</h1>
          <p className="text-sm text-stone-500 font-medium mt-1">Danh sách khách hàng yêu cầu tư vấn & báo giá</p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-4 border-[#171717] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-stone-500 text-sm font-medium">Đang tải dữ liệu...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#171717]">Chưa có yêu cầu nào</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">Chưa có khách hàng nào gửi form liên hệ từ website.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider">Khách Hàng</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider">Liên Hệ</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider">Nội Dung / Hạng Mục</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider">Trạng Thái</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#171717]">{contact.name}</div>
                      <div className="text-xs text-stone-500 mt-1">{new Date(contact.created_at).toLocaleString('vi-VN')}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-[#171717]">{contact.phone}</div>
                      <div className="text-sm text-stone-500 mt-1">{contact.email || 'Không có email'}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">{contact.subject || 'Chưa chọn'}</div>
                      <div className="text-sm text-stone-600 line-clamp-2 max-w-xs">{contact.message}</div>
                    </td>
                    <td className="px-6 py-5">
                      {contact.status === 'new' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/60">
                          <Clock size={12} /> Mới
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200/60">
                          <CheckCircle size={12} /> Đã Xử Lý
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      {contact.status === 'new' && (
                        <button
                          onClick={() => handleMarkContacted(contact.id)}
                          className="px-3 py-1.5 bg-[#171717] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors"
                        >
                          Đánh Dấu Đã Gọi
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManager;
