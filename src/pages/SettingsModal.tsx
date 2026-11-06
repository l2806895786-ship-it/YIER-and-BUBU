import React, { useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { Modal } from '../components/common/Modal';
import { Volume2, VolumeX, Music, Sparkles, Download, Upload, AlertTriangle, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    saveData,
    updateSettings,
    resetGame,
    exportGame,
    importGame
  } = useGame();

  const [confirmReset, setConfirmReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleToggleSound = () => {
    const next = !saveData.settings.soundEnabled;
    updateSettings({ soundEnabled: next });
    if (next) sound.playPop();
  };

  const handleToggleMusic = () => {
    const next = !saveData.settings.musicEnabled;
    updateSettings({ musicEnabled: next });
  };

  const handleToggleAnimations = () => {
    sound.playPop();
    updateSettings({ animationsEnabled: !saveData.settings.animationsEnabled });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ok = await importGame(file);
    if (ok) {
      onClose();
    }
  };

  const handleConfirmReset = () => {
    resetGame();
    setConfirmReset(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="游戏偏好设置"
      subtitle="Version 1.0 · 治愈系双熊休闲陪伴"
      icon="⚙️"
    >
      <div className="space-y-4">
        {/* Audio & Animation Toggles */}
        <div className="bg-white rounded-2xl border-2 border-[#4B2925]/15 p-3 space-y-3">
          {/* BGM Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF3DB] flex items-center justify-center text-sm">
                <Music className="w-4 h-4 text-[#B0703B]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#4B2925]">背景音乐</div>
                <div className="text-[10px] text-[#8C6D62]">轻柔治愈的马林巴音阶循环</div>
              </div>
            </div>

            <button
              onClick={handleToggleMusic}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer border border-[#4B2925]/20 ${
                saveData.settings.musicEnabled ? 'bg-[#588157]' : 'bg-[#E8DACB]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform absolute top-0.5 ${
                  saveData.settings.musicEnabled ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-[#4B2925]/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FBEAE7] flex items-center justify-center text-sm">
                <Volume2 className="w-4 h-4 text-[#C85A53]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#4B2925]">交互音效</div>
                <div className="text-[10px] text-[#8C6D62]">按钮点击、小熊轻抚与通关特效声</div>
              </div>
            </div>

            <button
              onClick={handleToggleSound}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer border border-[#4B2925]/20 ${
                saveData.settings.soundEnabled ? 'bg-[#588157]' : 'bg-[#E8DACB]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform absolute top-0.5 ${
                  saveData.settings.soundEnabled ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Animations Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-[#4B2925]/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#EBF4E7] flex items-center justify-center text-sm">
                <Sparkles className="w-4 h-4 text-[#487342]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#4B2925]">动态动画</div>
                <div className="text-[10px] text-[#8C6D62]">小熊呼吸浮动与交互回弹微动效</div>
              </div>
            </div>

            <button
              onClick={handleToggleAnimations}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer border border-[#4B2925]/20 ${
                saveData.settings.animationsEnabled ? 'bg-[#588157]' : 'bg-[#E8DACB]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform absolute top-0.5 ${
                  saveData.settings.animationsEnabled ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Data Backup & Restore */}
        <div className="bg-white rounded-2xl border-2 border-[#4B2925]/15 p-3 space-y-2">
          <div className="text-[11px] font-bold text-[#8C6D62] mb-1">存档管理</div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={exportGame}
              className="py-2.5 px-3 rounded-xl bg-[#FFF9F3] hover:bg-[#FBEAE7] border border-[#4B2925]/20 text-xs font-bold text-[#4B2925] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
            >
              <Download className="w-3.5 h-3.5 text-[#C87961]" />
              <span>备份导出 JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-2.5 px-3 rounded-xl bg-[#FFF9F3] hover:bg-[#FBEAE7] border border-[#4B2925]/20 text-xs font-bold text-[#4B2925] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
            >
              <Upload className="w-3.5 h-3.5 text-[#B0703B]" />
              <span>导入恢复存档</span>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Reset Progress Section */}
        <div className="pt-2">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
            >
              重置当前游戏进度
            </button>
          ) : (
            <div className="p-3 bg-red-50 border-2 border-red-200 rounded-2xl text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-red-700 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>确认要清除并重置所有进度吗？</span>
              </div>
              <p className="text-[10px] text-red-600">
                此操作将清除所有爱心币、亲密度、已解锁装扮和相片，无法撤销！
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-bold text-gray-700 cursor-pointer"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="flex-1 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold cursor-pointer"
                >
                  确认重置
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
