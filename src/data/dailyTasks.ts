import { DailyTask } from '../types/game';

export const DAILY_TASKS_TEMPLATE: Omit<DailyTask, 'current' | 'completed' | 'claimed'>[] = [
  {
    id: 'task_pet_yier',
    title: '摸摸一二',
    description: '轻触抚摸一二，听听软萌心声',
    target: 1,
    rewardCoins: 10,
    rewardAffection: 15
  },
  {
    id: 'task_pet_bubu',
    title: '戳戳布布',
    description: '轻触活泼的布布，感受元气熊抱',
    target: 1,
    rewardCoins: 10,
    rewardAffection: 15
  },
  {
    id: 'task_hug',
    title: '甜蜜拥抱',
    description: '让一二和布布紧紧抱在一起',
    target: 1,
    rewardCoins: 15,
    rewardAffection: 20
  },
  {
    id: 'task_play_game',
    title: '游玩小游戏',
    description: '在小游戏大厅任意通关或体验一局游戏',
    target: 1,
    rewardCoins: 20,
    rewardAffection: 25
  },
  {
    id: 'task_check_album',
    title: '翻阅纪念相册',
    description: '打开纪念相册回顾过往的温存记录',
    target: 1,
    rewardCoins: 10,
    rewardAffection: 10
  }
];
