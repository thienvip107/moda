import React, { useState, useEffect } from 'react';
import { FileText, Save, CheckCircle2, Loader2, Building, ShieldCheck } from 'lucide-react';
import { getPolicy, savePolicy } from '../../services/api';

export default function PolicyManager() {
  const [activeTab, setActiveTab] = useState('sales_policy');
  const [langTab, setLangTab] = useState('vi');
  const [policyData, setPolicyData] = useState({ title: '', title_en: '', content: '', content_en: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const tabs = [
    { key: 'sales_policy', label: 'Chính Sách Bán Hàng & Giao Nhận', icon: ShieldCheck },
    { key: 'company_profile', label: 'Hồ Sơ Năng Lực Công Ty', icon: Building },
  ];

  useEffect(() => {
    loadPolicy(activeTab);
  }, [activeTab]);

  async function loadPolicy(key) {
    setLoading(true);
    setMessage('');
    try {
      const data = await getPolicy(key);
      setPolicyData({
        title: data.title || (key === 'sales_policy' ? 'Chính Sách Bán Hàng' : 'Hồ Sơ Công Ty'),
        title_en: data.title_en || '',
        content: data.content || '',
        content_en: data.content_en || ''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await savePolicy(activeTab, policyData.title, policyData.content, policyData.title_en, policyData.content_en);
      setMessage('Đã lưu nội dung thành công!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert('Lưu thất bại: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-wider uppercase flex items-center space-x-3">
          <FileText className="w-7 h-7 text-[#D4AF37]" />
          <span>Quản Lý Hồ Sơ Công Ty & Chính Sách</span>
        </h1>
        <p className="text-xs text-stone-500 mt-1">Cập nhật thông tin giới thiệu năng lực doanh nghiệp và điều khoản quy định bán hàng song ngữ (Việt - Anh)</p>
      </div>

      {/* Tabs Selection */}
      <div className="flex space-x-3 border-b border-stone-200 pb-3 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex items-center space-x-2.5 px-6 py-3.5 rounded-2xl font-extrabold text-xs tracking-wider uppercase transition-all flex-shrink-0
                ${isActive 
                  ? 'bg-[#171717] text-white shadow-md' 
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-[#171717] hover:bg-stone-50'}
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Form Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {loading ? (
          <p className="text-xs text-stone-500">Đang nạp nội dung...</p>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {message && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {/* Language Tabs */}
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              <button
                type="button"
                onClick={() => setLangTab('vi')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  langTab === 'vi' 
                    ? 'bg-[#171717] text-[#D4AF37] shadow-sm' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>🇻🇳 Tiếng Việt (Nội dung chính)</span>
              </button>
              <button
                type="button"
                onClick={() => setLangTab('en')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  langTab === 'en' 
                    ? 'bg-[#171717] text-[#D4AF37] shadow-sm' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>🇬🇧 English Content</span>
                {policyData.title_en && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
              </button>
            </div>

            {langTab === 'vi' ? (
              <>
                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Tiêu Đề Trang (Tiếng Việt) *</label>
                  <input
                    type="text"
                    required
                    value={policyData.title}
                    onChange={e => setPolicyData({ ...policyData, title: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                    Nội Dung Chi Tiết (Tiếng Việt - Hỗ trợ trình bày HTML) *
                  </label>
                  <textarea
                    rows={14}
                    required
                    value={policyData.content}
                    onChange={e => setPolicyData({ ...policyData, content: e.target.value })}
                    placeholder="Nhập nội dung hồ sơ hoặc chính sách..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm text-[#171717] focus:border-[#171717] focus:outline-none font-mono text-xs leading-relaxed transition-all"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">Page Title (English)</label>
                  <input
                    type="text"
                    value={policyData.title_en}
                    onChange={e => setPolicyData({ ...policyData, title_en: e.target.value })}
                    placeholder="Company Profile / Sales & Delivery Policy..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#171717] uppercase tracking-wider mb-2">
                    Detailed Content (English - HTML supported)
                  </label>
                  <textarea
                    rows={14}
                    value={policyData.content_en}
                    onChange={e => setPolicyData({ ...policyData, content_en: e.target.value })}
                    placeholder="Enter English policy or profile content..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm text-[#171717] focus:border-[#171717] focus:outline-none font-mono text-xs leading-relaxed transition-all"
                  />
                </div>
              </>
            )}

            <p className="text-xs text-stone-500 mt-2">
              💡 Sử dụng các thẻ HTML cơ bản như <code className="text-amber-800 font-bold">&lt;h3&gt;</code>, <code className="text-amber-800 font-bold">&lt;p&gt;</code>, <code className="text-amber-800 font-bold">&lt;ul&gt;</code>, <code className="text-amber-800 font-bold">&lt;strong&gt;</code> để định dạng tiêu đề & đoạn văn đẹp mắt.
            </p>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#171717] hover:bg-stone-800 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-[#D4AF37]" />}
              <span>{saving ? 'Đang Lưu...' : 'Lưu Thay Đổi Nội Dung'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
