import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, Clock, CheckCircle2, Phone, Trash2, RefreshCw, Filter, MessageSquare, AlertCircle } from 'lucide-react';
import { getContacts, updateContactStatus, deleteContact } from '../../services/api';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // 'all', 'new', 'contacted'
  const [searchKeyword, setSearchKeyword] = useState('');

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
      setContacts(prev => prev.map(c => String(c.id) === String(id) ? { ...c, status: 'contacted' } : c));
      showToast('Đã đánh dấu là đã liên hệ tư vấn');
    } catch (err) {
      console.error(err);
      showToast('Lỗi khi cập nhật trạng thái');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa yêu cầu liên hệ này?')) {
      try {
        await deleteContact(id);
        setContacts(prev => prev.filter(c => String(c.id) !== String(id)));
        showToast('Đã xóa yêu cầu liên hệ');
      } catch (err) {
        console.error(err);
        showToast('Lỗi khi xóa liên hệ');
      }
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesTab = filterTab === 'all' 
      ? true 
      : filterTab === 'new' 
        ? contact.status === 'new' 
        : contact.status === 'contacted';
    
    const matchesSearch = !searchKeyword.trim() || 
      (contact.name && contact.name.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (contact.phone && contact.phone.includes(searchKeyword)) ||
      (contact.email && contact.email.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (contact.message && contact.message.toLowerCase().includes(searchKeyword.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const newCount = contacts.filter(c => c.status === 'new').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171717] text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 border border-stone-700">
          <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[#171717] flex items-center gap-3">
            <span>Quản Lý Yêu Cầu Liên Hệ & Báo Giá</span>
            {newCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-bold animate-pulse">
                {newCount} mới
              </span>
            )}
          </h1>
          <p className="text-sm text-stone-500 font-medium mt-1">Danh sách khách hàng yêu cầu tư vấn & báo giá từ Website</p>
        </div>

        <button
          onClick={fetchContacts}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-all border border-stone-200 shadow-xs"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Làm mới danh sách</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-stone-200 p-4 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'all' 
                ? 'bg-[#171717] text-white shadow-sm' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Tất cả ({contacts.length})
          </button>
          <button
            onClick={() => setFilterTab('new')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterTab === 'new' 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <Clock size={13} />
            <span>Chưa xử lý ({newCount})</span>
          </button>
          <button
            onClick={() => setFilterTab('contacted')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterTab === 'contacted' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle size={13} />
            <span>Đã liên hệ ({contacts.filter(c => c.status === 'contacted').length})</span>
          </button>
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Tìm theo tên, SĐT, email..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#171717] transition-all font-medium"
          />
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center">
            <div className="w-8 h-8 border-4 border-[#171717] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-stone-500 text-sm font-medium">Đang tải dữ liệu...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#171717]">Không tìm thấy yêu cầu nào</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {searchKeyword ? 'Không có kết quả phù hợp với từ khóa tìm kiếm.' : 'Chưa có khách hàng nào gửi form liên hệ trong mục này.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider">Khách Hàng</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider">Thông Tin Liên Hệ</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider">Hạng Mục / Nội Dung</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider">Trạng Thái</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-[#171717] uppercase tracking-wider text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#171717] text-sm">{contact.name || 'Khách hàng'}</div>
                      <div className="text-xs text-stone-500 mt-1">
                        {contact.created_at ? new Date(contact.created_at).toLocaleString('vi-VN') : 'Mới đây'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {contact.phone ? (
                        <a 
                          href={`tel:${contact.phone}`} 
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D4AF37] hover:underline"
                        >
                          <Phone size={13} /> {contact.phone}
                        </a>
                      ) : (
                        <span className="text-xs text-stone-400">Không có SĐT</span>
                      )}
                      <div className="text-xs text-stone-500 mt-1">
                        {contact.email ? (
                          <a href={`mailto:${contact.email}`} className="hover:underline text-stone-600">
                            {contact.email}
                          </a>
                        ) : (
                          'Không có email'
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-1">
                        {contact.subject || 'Yêu cầu báo giá đá tự nhiên'}
                      </div>
                      <div className="text-xs text-stone-600 leading-relaxed max-w-sm whitespace-pre-wrap">
                        {contact.message || 'Không có ghi chú thêm.'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {contact.status === 'new' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/60">
                          <Clock size={12} /> Mới nhận
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                          <CheckCircle size={12} /> Đã tư vấn
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {contact.status === 'new' && (
                          <button
                            onClick={() => handleMarkContacted(contact.id)}
                            className="px-3 py-1.5 bg-[#171717] hover:bg-black text-white text-xs font-bold rounded-lg transition-colors shadow-xs flex items-center gap-1"
                          >
                            <CheckCircle size={12} className="text-[#D4AF37]" />
                            <span>Đã Gọi</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(contact.id)}
                          title="Xóa yêu cầu này"
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
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
