export const translations = {
  zh: {
    // 应用标题
    appTitle: '情绪管理助手',
    appSubtitle: '基于菲斯汀格法则的情绪记录与反思应用',
    
    // 初始设置
    welcome: '欢迎使用',
    selectLanguage: '选择语言',
    festingerIntro: '开启你的情绪管理之旅',
    festingerMode: '菲斯汀格法则模式',
    festingerModeDesc: '掌控你的情绪反应，改变你的人生',
    startJourney: '开始情绪管理之旅',
    continue: '继续',
    complete: '完成设置',
    
    // 菲斯汀格法则
    festingerRule: '事件10% + 反应90% = 人生100%',
    festingerExplanation: '生活中10%的事情是我们无法控制的，但90%的反应完全由我们决定',
    
    // 情绪
    emotions: {
      happy: '快乐',
      sad: '悲伤',
      angry: '愤怒',
      calm: '平静',
      anxious: '焦虑',
      excited: '兴奋',
      frustrated: '沮丧',
      peaceful: '安详'
    },
    
    // 主界面
    howFeeling: '此刻的你，感受如何？',
    selectEmotion: '轻触选择最符合当前感受的情绪',
    emotionIntensity: '情绪强度',
    intensityDesc: '调节情绪的强烈程度 (1-10)',
    mild: '轻微',
    intense: '强烈',
    intensity: '强度',
    
    // 触发事件
    whatHappened: '发生了什么？',
    triggerDesc: '描述触发这种情绪的事件 (可选)',
    triggerPlaceholder: '例如：工作中遇到了困难、收到了好消息、与朋友发生争执...',
    
    // 菲斯汀格法则提醒
    festingerReminder: '记住菲斯汀格法则：事件本身只占10%，你的反应占90%',
    festingerSubtext: '记录下来，稍后可以反思如何更好地应对类似情况',
    
    // 按钮
    saveRecord: '保存记录',
    
    // 历史记录
    recentRecords: '最近记录',
    todayTrack: '今天的情绪轨迹',
    pastRecords: '过往记录',
    
    // 统计
    todayStats: '今日统计',
    recordCount: '记录次数',
    avgIntensity: '平均强度',
    
    // 导航
    past: '过往',
    today: '今日',
    settings: '设置',
    
    // 设置页面
    settingsTitle: '设置',
    languageSetting: '语言设置',
    changeLanguage: '更改语言',
    
    // 空状态
    noRecords: '还没有情绪记录',
    noRecordsToday: '今天还没有记录',
    startRecording: '开始记录情绪吧！',
    
    // 时间
    today: '今天',
    yesterday: '昨天',
    
    // 交互提示
    tapToSelect: '轻触选择',
    holdForDetails: '长按查看详情',
    swipeToAdjust: '滑动调节'
  },
  
  en: {
    // App title
    appTitle: 'Emotion Manager',
    appSubtitle: 'Emotion recording and reflection app based on Festinger\'s Law',
    
    // Initial setup
    welcome: 'Welcome',
    selectLanguage: 'Select Language',
    festingerIntro: 'Start your emotional management journey',
    festingerMode: 'Festinger\'s Law Mode',
    festingerModeDesc: 'Master your emotional reactions, change your life',
    startJourney: 'Start Emotional Journey',
    continue: 'Continue',
    complete: 'Complete Setup',
    
    // Festinger's Law
    festingerRule: 'Events 10% + Reactions 90% = Life 100%',
    festingerExplanation: '10% of life is what happens to us, 90% is how we react to it',
    
    // Emotions
    emotions: {
      happy: 'Happy',
      sad: 'Sad',
      angry: 'Angry',
      calm: 'Calm',
      anxious: 'Anxious',
      excited: 'Excited',
      frustrated: 'Frustrated',
      peaceful: 'Peaceful'
    },
    
    // Main interface
    howFeeling: 'How are you feeling right now?',
    selectEmotion: 'Tap to select the emotion that matches your current feeling',
    emotionIntensity: 'Emotion Intensity',
    intensityDesc: 'Adjust the intensity of the emotion (1-10)',
    mild: 'Mild',
    intense: 'Intense',
    intensity: 'Intensity',
    
    // Trigger events
    whatHappened: 'What happened?',
    triggerDesc: 'Describe the event that triggered this emotion (optional)',
    triggerPlaceholder: 'e.g., Encountered difficulties at work, received good news, had an argument with a friend...',
    
    // Festinger's Law reminder
    festingerReminder: 'Remember Festinger\'s Law: Events account for only 10%, your reaction accounts for 90%',
    festingerSubtext: 'Record it down, you can reflect on how to better handle similar situations later',
    
    // Buttons
    saveRecord: 'Save Record',
    
    // History
    recentRecords: 'Recent Records',
    todayTrack: 'Today\'s emotional track',
    pastRecords: 'Past Records',
    
    // Statistics
    todayStats: 'Today\'s Statistics',
    recordCount: 'Record Count',
    avgIntensity: 'Average Intensity',
    
    // Navigation
    past: 'Past',
    today: 'Today',
    settings: 'Settings',
    
    // Settings page
    settingsTitle: 'Settings',
    languageSetting: 'Language Settings',
    changeLanguage: 'Change Language',
    
    // Empty states
    noRecords: 'No emotion records yet',
    noRecordsToday: 'No records today',
    startRecording: 'Start recording emotions!',
    
    // Time
    today: 'Today',
    yesterday: 'Yesterday',
    
    // Interactive hints
    tapToSelect: 'Tap to select',
    holdForDetails: 'Hold for details',
    swipeToAdjust: 'Swipe to adjust'
  }
}

export const useTranslation = (language) => {
  return (key) => {
    const keys = key.split('.')
    let value = translations[language] || translations.zh
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }
}

