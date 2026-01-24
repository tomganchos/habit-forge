import type { Language } from '@/types';

export interface Translations {
  // App
  appName: string;

  // Navigation
  nav: {
    today: string;
    calendar: string;
    achievements: string;
    settings: string;
  };

  // Today screen
  today: {
    title: string;
    addGoal: string;
    noGoals: string;
    noGoalsHint: string;
    catchUp: string;
    todayLabel: string;
    thisWeek: string;
    thisMonth: string;
  };

  // Goal form
  goalForm: {
    newGoal: string;
    editGoal: string;
    icon: string;
    title: string;
    titlePlaceholder: string;
    unit: string;
    unitCount: string;
    unitTime: string;
    period: string;
    periodDay: string;
    periodWeek: string;
    periodMonth: string;
    target: string;
    targetCount: string;
    targetMinutes: string;
    duration: string;
    durationForever: string;
    durationEndDate: string;
    durationPeriods: string;
    endDate: string;
    numberOfPeriods: string;
    save: string;
    create: string;
    cancel: string;
    delete: string;
    archive: string;
    deleteConfirmTitle: string;
    deleteConfirmMessage: string;
    archiveConfirmTitle: string;
    archiveConfirmMessage: string;
    confirm: string;
  };

  // Calendar
  calendar: {
    title: string;
    noGoals: string;
    selectGoal: string;
    progress: string;
    progressCount: string;
    progressMinutes: string;
    lessThan50: string;
    between50and99: string;
    between100and199: string;
    moreThan200: string;
  };

  // Achievements
  achievements: {
    title: string;
    unlocked: string;
    locked: string;
    unlockedOn: string;
    // Achievement names
    firstGoal: string;
    firstGoalDesc: string;
    firstVictory: string;
    firstVictoryDesc: string;
    streak3: string;
    streak3Desc: string;
    streak7: string;
    streak7Desc: string;
    streak30: string;
    streak30Desc: string;
    perfectWeek: string;
    perfectWeekDesc: string;
    overachiever: string;
    overachieverDesc: string;
    celebrationTitle: string;
  };

  // Settings
  settings: {
    title: string;
    notifications: string;
    dailyReminders: string;
    reminderTime: string;
    reminderTimeDesc: string;
    notifUnsupported: string;
    notifBlocked: string;
    notifClickToEnable: string;
    notifEnabled: string;
    notifDisabled: string;
    enable: string;
    enabled: string;
    language: string;
    languageDesc: string;
    theme: string;
    themeDesc: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    about: string;
    version: string;
    aboutText: string;
    data: string;
    exportData: string;
    exportDataDesc: string;
    export: string;
  };

  // Common
  common: {
    days: string;
    weeks: string;
    months: string;
  };

  // Weekdays
  weekdays: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Habit Forge',
    nav: {
      today: 'Today',
      calendar: 'Calendar',
      achievements: 'Trophies',
      settings: 'Settings',
    },
    today: {
      title: 'Today',
      addGoal: '+ Add Goal',
      noGoals: 'No goals yet',
      noGoalsHint: 'Add your first goal to start tracking',
      catchUp: 'Catch-up needed:',
      todayLabel: 'Today',
      thisWeek: 'This week',
      thisMonth: 'This month',
    },
    goalForm: {
      newGoal: 'New Goal',
      editGoal: 'Edit Goal',
      icon: 'Icon',
      title: 'Title',
      titlePlaceholder: 'e.g., Exercise, Read, Meditate',
      unit: 'Unit',
      unitCount: 'Count (times)',
      unitTime: 'Time (minutes)',
      period: 'Period',
      periodDay: 'Per day',
      periodWeek: 'Per week',
      periodMonth: 'Per month',
      target: 'Target',
      targetCount: 'times',
      targetMinutes: 'minutes',
      duration: 'Duration',
      durationForever: 'Forever',
      durationEndDate: 'Until specific date',
      durationPeriods: 'For N periods',
      endDate: 'End Date',
      numberOfPeriods: 'Number of',
      save: 'Save',
      create: 'Create',
      cancel: 'Cancel',
      delete: 'Delete',
      archive: 'Archive',
      deleteConfirmTitle: 'Delete Goal',
      deleteConfirmMessage:
        'Are you sure you want to delete this goal? This will also remove all progress data and cannot be undone.',
      archiveConfirmTitle: 'Archive Goal',
      archiveConfirmMessage:
        'Archive this goal? It will be hidden from the Today view but your progress data will be preserved.',
      confirm: 'Confirm',
    },
    calendar: {
      title: 'Calendar',
      noGoals: 'No goals yet. Create a goal to see your progress calendar.',
      selectGoal: 'Select a goal to view its calendar',
      progress: 'Progress',
      progressCount: 'count',
      progressMinutes: 'minutes',
      lessThan50: '<50%',
      between50and99: '50-99%',
      between100and199: '100-199%',
      moreThan200: '≥200%',
    },
    achievements: {
      title: 'Achievements',
      unlocked: 'Unlocked',
      locked: 'Locked',
      unlockedOn: 'Unlocked',
      firstGoal: 'Getting Started',
      firstGoalDesc: 'Created your first goal',
      firstVictory: 'First Victory',
      firstVictoryDesc: 'Completed a goal for the first time',
      streak3: 'On a Roll',
      streak3Desc: 'Maintained a 3-day streak',
      streak7: 'Week Warrior',
      streak7Desc: 'Maintained a 7-day streak',
      streak30: 'Habit Master',
      streak30Desc: 'Maintained a 30-day streak',
      perfectWeek: 'Perfect Week',
      perfectWeekDesc: 'Hit 100% on all goals for a week',
      overachiever: 'Overachiever',
      overachieverDesc: 'Reached 200% on any goal',
      celebrationTitle: 'Achievement Unlocked!',
    },
    settings: {
      title: 'Settings',
      notifications: 'Notifications',
      dailyReminders: 'Daily Reminders',
      reminderTime: 'Reminder Time',
      reminderTimeDesc: 'When to send daily reminders',
      notifUnsupported: 'Your browser does not support notifications',
      notifBlocked: 'Notifications are blocked. Please enable them in your browser settings.',
      notifClickToEnable: 'Click to enable notifications',
      notifEnabled: 'Notifications are enabled',
      notifDisabled: 'Notifications are disabled',
      enable: 'Enable',
      enabled: 'Enabled',
      language: 'Language',
      languageDesc: 'Choose your preferred language',
      theme: 'Theme',
      themeDesc: 'Choose your preferred color theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeSystem: 'System',
      about: 'About',
      version: 'v0.1.0',
      aboutText:
        'Track your habits and build better routines. Your data is stored locally on your device.',
      data: 'Data',
      exportData: 'Export Data',
      exportDataDesc: 'Download your data as JSON',
      export: 'Export',
    },
    common: {
      days: 'days',
      weeks: 'weeks',
      months: 'months',
    },
    weekdays: {
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun',
    },
  },

  ru: {
    appName: 'Habit Forge',
    nav: {
      today: 'Сегодня',
      calendar: 'Календарь',
      achievements: 'Награды',
      settings: 'Настройки',
    },
    today: {
      title: 'Сегодня',
      addGoal: '+ Добавить цель',
      noGoals: 'Целей пока нет',
      noGoalsHint: 'Добавьте первую цель для отслеживания',
      catchUp: 'Нужно наверстать:',
      todayLabel: 'Сегодня',
      thisWeek: 'На этой неделе',
      thisMonth: 'В этом месяце',
    },
    goalForm: {
      newGoal: 'Новая цель',
      editGoal: 'Редактировать цель',
      icon: 'Иконка',
      title: 'Название',
      titlePlaceholder: 'напр., Упражнения, Чтение, Медитация',
      unit: 'Единица',
      unitCount: 'Количество (раз)',
      unitTime: 'Время (минуты)',
      period: 'Период',
      periodDay: 'В день',
      periodWeek: 'В неделю',
      periodMonth: 'В месяц',
      target: 'Цель',
      targetCount: 'раз',
      targetMinutes: 'минут',
      duration: 'Длительность',
      durationForever: 'Всегда',
      durationEndDate: 'До определённой даты',
      durationPeriods: 'На N периодов',
      endDate: 'Дата окончания',
      numberOfPeriods: 'Количество',
      save: 'Сохранить',
      create: 'Создать',
      cancel: 'Отмена',
      delete: 'Удалить',
      archive: 'Архивировать',
      deleteConfirmTitle: 'Удалить цель',
      deleteConfirmMessage:
        'Вы уверены, что хотите удалить эту цель? Все данные о прогрессе также будут удалены. Это действие нельзя отменить.',
      archiveConfirmTitle: 'Архивировать цель',
      archiveConfirmMessage:
        'Архивировать эту цель? Она будет скрыта из вида "Сегодня", но данные о прогрессе сохранятся.',
      confirm: 'Подтвердить',
    },
    calendar: {
      title: 'Календарь',
      noGoals: 'Целей пока нет. Создайте цель, чтобы увидеть календарь прогресса.',
      selectGoal: 'Выберите цель для просмотра календаря',
      progress: 'Прогресс',
      progressCount: 'количество',
      progressMinutes: 'минуты',
      lessThan50: '<50%',
      between50and99: '50-99%',
      between100and199: '100-199%',
      moreThan200: '≥200%',
    },
    achievements: {
      title: 'Достижения',
      unlocked: 'Получено',
      locked: 'Заблокировано',
      unlockedOn: 'Получено',
      firstGoal: 'Начало пути',
      firstGoalDesc: 'Создана первая цель',
      firstVictory: 'Первая победа',
      firstVictoryDesc: 'Впервые выполнена цель',
      streak3: 'В ударе',
      streak3Desc: '3 дня подряд',
      streak7: 'Воин недели',
      streak7Desc: '7 дней подряд',
      streak30: 'Мастер привычек',
      streak30Desc: '30 дней подряд',
      perfectWeek: 'Идеальная неделя',
      perfectWeekDesc: '100% по всем целям за неделю',
      overachiever: 'Сверхдостижение',
      overachieverDesc: 'Достигнуто 200% по любой цели',
      celebrationTitle: 'Достижение разблокировано!',
    },
    settings: {
      title: 'Настройки',
      notifications: 'Уведомления',
      dailyReminders: 'Ежедневные напоминания',
      reminderTime: 'Время напоминания',
      reminderTimeDesc: 'Когда отправлять ежедневные напоминания',
      notifUnsupported: 'Ваш браузер не поддерживает уведомления',
      notifBlocked: 'Уведомления заблокированы. Включите их в настройках браузера.',
      notifClickToEnable: 'Нажмите для включения уведомлений',
      notifEnabled: 'Уведомления включены',
      notifDisabled: 'Уведомления отключены',
      enable: 'Включить',
      enabled: 'Включено',
      language: 'Язык',
      languageDesc: 'Выберите предпочитаемый язык',
      theme: 'Тема',
      themeDesc: 'Выберите цветовую тему',
      themeLight: 'Светлая',
      themeDark: 'Тёмная',
      themeSystem: 'Системная',
      about: 'О приложении',
      version: 'v0.1.0',
      aboutText:
        'Отслеживайте привычки и формируйте полезные рутины. Данные хранятся локально на вашем устройстве.',
      data: 'Данные',
      exportData: 'Экспорт данных',
      exportDataDesc: 'Скачать данные в формате JSON',
      export: 'Экспорт',
    },
    common: {
      days: 'дней',
      weeks: 'недель',
      months: 'месяцев',
    },
    weekdays: {
      mon: 'Пн',
      tue: 'Вт',
      wed: 'Ср',
      thu: 'Чт',
      fri: 'Пт',
      sat: 'Сб',
      sun: 'Вс',
    },
  },

  fr: {
    appName: 'Habit Forge',
    nav: {
      today: "Aujourd'hui",
      calendar: 'Calendrier',
      achievements: 'Trophées',
      settings: 'Paramètres',
    },
    today: {
      title: "Aujourd'hui",
      addGoal: '+ Ajouter un objectif',
      noGoals: "Pas encore d'objectifs",
      noGoalsHint: 'Ajoutez votre premier objectif pour commencer',
      catchUp: 'À rattraper :',
      todayLabel: "Aujourd'hui",
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois-ci',
    },
    goalForm: {
      newGoal: 'Nouvel objectif',
      editGoal: "Modifier l'objectif",
      icon: 'Icône',
      title: 'Titre',
      titlePlaceholder: 'ex., Exercice, Lecture, Méditation',
      unit: 'Unité',
      unitCount: 'Nombre (fois)',
      unitTime: 'Temps (minutes)',
      period: 'Période',
      periodDay: 'Par jour',
      periodWeek: 'Par semaine',
      periodMonth: 'Par mois',
      target: 'Objectif',
      targetCount: 'fois',
      targetMinutes: 'minutes',
      duration: 'Durée',
      durationForever: 'Pour toujours',
      durationEndDate: "Jusqu'à une date précise",
      durationPeriods: 'Pour N périodes',
      endDate: 'Date de fin',
      numberOfPeriods: 'Nombre de',
      save: 'Enregistrer',
      create: 'Créer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      archive: 'Archiver',
      deleteConfirmTitle: "Supprimer l'objectif",
      deleteConfirmMessage:
        'Voulez-vous vraiment supprimer cet objectif ? Toutes les données de progression seront également supprimées. Cette action est irréversible.',
      archiveConfirmTitle: "Archiver l'objectif",
      archiveConfirmMessage:
        "Archiver cet objectif ? Il sera masqué de la vue Aujourd'hui mais vos données de progression seront conservées.",
      confirm: 'Confirmer',
    },
    calendar: {
      title: 'Calendrier',
      noGoals:
        "Pas encore d'objectifs. Créez un objectif pour voir votre calendrier de progression.",
      selectGoal: 'Sélectionnez un objectif pour voir son calendrier',
      progress: 'Progression',
      progressCount: 'nombre',
      progressMinutes: 'minutes',
      lessThan50: '<50%',
      between50and99: '50-99%',
      between100and199: '100-199%',
      moreThan200: '≥200%',
    },
    achievements: {
      title: 'Succès',
      unlocked: 'Débloqué',
      locked: 'Verrouillé',
      unlockedOn: 'Débloqué le',
      firstGoal: 'Premier pas',
      firstGoalDesc: 'Créé votre premier objectif',
      firstVictory: 'Première victoire',
      firstVictoryDesc: 'Complété un objectif pour la première fois',
      streak3: 'En forme',
      streak3Desc: '3 jours consécutifs',
      streak7: 'Guerrier de la semaine',
      streak7Desc: '7 jours consécutifs',
      streak30: 'Maître des habitudes',
      streak30Desc: '30 jours consécutifs',
      perfectWeek: 'Semaine parfaite',
      perfectWeekDesc: '100% sur tous les objectifs pendant une semaine',
      overachiever: 'Surperformant',
      overachieverDesc: 'Atteint 200% sur un objectif',
      celebrationTitle: 'Succès débloqué !',
    },
    settings: {
      title: 'Paramètres',
      notifications: 'Notifications',
      dailyReminders: 'Rappels quotidiens',
      reminderTime: 'Heure de rappel',
      reminderTimeDesc: 'Quand envoyer les rappels quotidiens',
      notifUnsupported: 'Votre navigateur ne supporte pas les notifications',
      notifBlocked:
        'Les notifications sont bloquées. Veuillez les activer dans les paramètres du navigateur.',
      notifClickToEnable: 'Cliquez pour activer les notifications',
      notifEnabled: 'Les notifications sont activées',
      notifDisabled: 'Les notifications sont désactivées',
      enable: 'Activer',
      enabled: 'Activé',
      language: 'Langue',
      languageDesc: 'Choisissez votre langue préférée',
      theme: 'Thème',
      themeDesc: 'Choisissez votre thème de couleur préféré',
      themeLight: 'Clair',
      themeDark: 'Sombre',
      themeSystem: 'Système',
      about: 'À propos',
      version: 'v0.1.0',
      aboutText:
        'Suivez vos habitudes et construisez de meilleures routines. Vos données sont stockées localement.',
      data: 'Données',
      exportData: 'Exporter les données',
      exportDataDesc: 'Télécharger vos données en JSON',
      export: 'Exporter',
    },
    common: {
      days: 'jours',
      weeks: 'semaines',
      months: 'mois',
    },
    weekdays: {
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mer',
      thu: 'Jeu',
      fri: 'Ven',
      sat: 'Sam',
      sun: 'Dim',
    },
  },

  it: {
    appName: 'Habit Forge',
    nav: {
      today: 'Oggi',
      calendar: 'Calendario',
      achievements: 'Trofei',
      settings: 'Impostazioni',
    },
    today: {
      title: 'Oggi',
      addGoal: '+ Aggiungi obiettivo',
      noGoals: 'Nessun obiettivo ancora',
      noGoalsHint: 'Aggiungi il tuo primo obiettivo per iniziare',
      catchUp: 'Da recuperare:',
      todayLabel: 'Oggi',
      thisWeek: 'Questa settimana',
      thisMonth: 'Questo mese',
    },
    goalForm: {
      newGoal: 'Nuovo obiettivo',
      editGoal: 'Modifica obiettivo',
      icon: 'Icona',
      title: 'Titolo',
      titlePlaceholder: 'es., Esercizio, Lettura, Meditazione',
      unit: 'Unità',
      unitCount: 'Conteggio (volte)',
      unitTime: 'Tempo (minuti)',
      period: 'Periodo',
      periodDay: 'Al giorno',
      periodWeek: 'A settimana',
      periodMonth: 'Al mese',
      target: 'Obiettivo',
      targetCount: 'volte',
      targetMinutes: 'minuti',
      duration: 'Durata',
      durationForever: 'Per sempre',
      durationEndDate: 'Fino a una data specifica',
      durationPeriods: 'Per N periodi',
      endDate: 'Data di fine',
      numberOfPeriods: 'Numero di',
      save: 'Salva',
      create: 'Crea',
      cancel: 'Annulla',
      delete: 'Elimina',
      archive: 'Archivia',
      deleteConfirmTitle: 'Elimina obiettivo',
      deleteConfirmMessage:
        'Sei sicuro di voler eliminare questo obiettivo? Tutti i dati di progresso verranno eliminati. Questa azione non può essere annullata.',
      archiveConfirmTitle: 'Archivia obiettivo',
      archiveConfirmMessage:
        'Archiviare questo obiettivo? Verrà nascosto dalla vista Oggi ma i tuoi dati di progresso saranno conservati.',
      confirm: 'Conferma',
    },
    calendar: {
      title: 'Calendario',
      noGoals: 'Nessun obiettivo ancora. Crea un obiettivo per vedere il calendario dei progressi.',
      selectGoal: 'Seleziona un obiettivo per vedere il suo calendario',
      progress: 'Progressi',
      progressCount: 'conteggio',
      progressMinutes: 'minuti',
      lessThan50: '<50%',
      between50and99: '50-99%',
      between100and199: '100-199%',
      moreThan200: '≥200%',
    },
    achievements: {
      title: 'Traguardi',
      unlocked: 'Sbloccato',
      locked: 'Bloccato',
      unlockedOn: 'Sbloccato il',
      firstGoal: 'Primi passi',
      firstGoalDesc: 'Creato il primo obiettivo',
      firstVictory: 'Prima vittoria',
      firstVictoryDesc: 'Completato un obiettivo per la prima volta',
      streak3: 'In forma',
      streak3Desc: '3 giorni consecutivi',
      streak7: 'Guerriero settimanale',
      streak7Desc: '7 giorni consecutivi',
      streak30: 'Maestro delle abitudini',
      streak30Desc: '30 giorni consecutivi',
      perfectWeek: 'Settimana perfetta',
      perfectWeekDesc: '100% su tutti gli obiettivi per una settimana',
      overachiever: 'Superperformante',
      overachieverDesc: 'Raggiunto 200% su qualsiasi obiettivo',
      celebrationTitle: 'Traguardo sbloccato!',
    },
    settings: {
      title: 'Impostazioni',
      notifications: 'Notifiche',
      dailyReminders: 'Promemoria giornalieri',
      reminderTime: 'Ora promemoria',
      reminderTimeDesc: 'Quando inviare i promemoria giornalieri',
      notifUnsupported: 'Il tuo browser non supporta le notifiche',
      notifBlocked: 'Le notifiche sono bloccate. Abilitale nelle impostazioni del browser.',
      notifClickToEnable: 'Clicca per abilitare le notifiche',
      notifEnabled: 'Le notifiche sono abilitate',
      notifDisabled: 'Le notifiche sono disabilitate',
      enable: 'Abilita',
      enabled: 'Abilitato',
      language: 'Lingua',
      languageDesc: 'Scegli la tua lingua preferita',
      theme: 'Tema',
      themeDesc: 'Scegli il tuo tema colore preferito',
      themeLight: 'Chiaro',
      themeDark: 'Scuro',
      themeSystem: 'Sistema',
      about: 'Info',
      version: 'v0.1.0',
      aboutText:
        'Traccia le tue abitudini e costruisci routine migliori. I tuoi dati sono memorizzati localmente.',
      data: 'Dati',
      exportData: 'Esporta dati',
      exportDataDesc: 'Scarica i tuoi dati come JSON',
      export: 'Esporta',
    },
    common: {
      days: 'giorni',
      weeks: 'settimane',
      months: 'mesi',
    },
    weekdays: {
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mer',
      thu: 'Gio',
      fri: 'Ven',
      sat: 'Sab',
      sun: 'Dom',
    },
  },

  ee: {
    appName: 'Habit Forge',
    nav: {
      today: 'Täna',
      calendar: 'Kalender',
      achievements: 'Saavutused',
      settings: 'Seaded',
    },
    today: {
      title: 'Täna',
      addGoal: '+ Lisa eesmärk',
      noGoals: 'Eesmärke pole veel',
      noGoalsHint: 'Lisa oma esimene eesmärk jälgimise alustamiseks',
      catchUp: 'Vaja järele jõuda:',
      todayLabel: 'Täna',
      thisWeek: 'Sel nädalal',
      thisMonth: 'Sel kuul',
    },
    goalForm: {
      newGoal: 'Uus eesmärk',
      editGoal: 'Muuda eesmärki',
      icon: 'Ikoon',
      title: 'Pealkiri',
      titlePlaceholder: 'nt, Treening, Lugemine, Meditatsioon',
      unit: 'Ühik',
      unitCount: 'Arv (korda)',
      unitTime: 'Aeg (minutit)',
      period: 'Periood',
      periodDay: 'Päevas',
      periodWeek: 'Nädalas',
      periodMonth: 'Kuus',
      target: 'Sihtmärk',
      targetCount: 'korda',
      targetMinutes: 'minutit',
      duration: 'Kestus',
      durationForever: 'Igavesti',
      durationEndDate: 'Kindla kuupäevani',
      durationPeriods: 'N perioodi jooksul',
      endDate: 'Lõppkuupäev',
      numberOfPeriods: 'Perioodide arv',
      save: 'Salvesta',
      create: 'Loo',
      cancel: 'Tühista',
      delete: 'Kustuta',
      archive: 'Arhiveeri',
      deleteConfirmTitle: 'Kustuta eesmärk',
      deleteConfirmMessage:
        'Kas oled kindel, et soovid selle eesmärgi kustutada? Kõik eduandmed kustutatakse samuti. Seda toimingut ei saa tagasi võtta.',
      archiveConfirmTitle: 'Arhiveeri eesmärk',
      archiveConfirmMessage:
        'Arhiveerida see eesmärk? See peidetakse Täna vaatest, kuid sinu eduandmed säilitatakse.',
      confirm: 'Kinnita',
    },
    calendar: {
      title: 'Kalender',
      noGoals: 'Eesmärke pole veel. Loo eesmärk, et näha edukalendrit.',
      selectGoal: 'Vali eesmärk selle kalendri vaatamiseks',
      progress: 'Edenemine',
      progressCount: 'arv',
      progressMinutes: 'minutit',
      lessThan50: '<50%',
      between50and99: '50-99%',
      between100and199: '100-199%',
      moreThan200: '≥200%',
    },
    achievements: {
      title: 'Saavutused',
      unlocked: 'Avatud',
      locked: 'Lukus',
      unlockedOn: 'Avatud',
      firstGoal: 'Algus tehtud',
      firstGoalDesc: 'Lõid oma esimese eesmärgi',
      firstVictory: 'Esimene võit',
      firstVictoryDesc: 'Täitsid eesmärgi esimest korda',
      streak3: 'Hoos',
      streak3Desc: '3-päevane seeria',
      streak7: 'Nädala võitleja',
      streak7Desc: '7-päevane seeria',
      streak30: 'Harjumuste meister',
      streak30Desc: '30-päevane seeria',
      perfectWeek: 'Täiuslik nädal',
      perfectWeekDesc: '100% kõigil eesmärkidel terve nädala jooksul',
      overachiever: 'Ületegija',
      overachieverDesc: 'Saavutasid 200% mis tahes eesmärgil',
      celebrationTitle: 'Saavutus avatud!',
    },
    settings: {
      title: 'Seaded',
      notifications: 'Teavitused',
      dailyReminders: 'Igapäevased meeldetuletused',
      reminderTime: 'Meeldetuletuse aeg',
      reminderTimeDesc: 'Millal saata igapäevaseid meeldetuletusi',
      notifUnsupported: 'Sinu brauser ei toeta teavitusi',
      notifBlocked: 'Teavitused on blokeeritud. Palun luba need brauseri seadetes.',
      notifClickToEnable: 'Klõpsa teavituste lubamiseks',
      notifEnabled: 'Teavitused on lubatud',
      notifDisabled: 'Teavitused on keelatud',
      enable: 'Luba',
      enabled: 'Lubatud',
      language: 'Keel',
      languageDesc: 'Vali eelistatud keel',
      theme: 'Teema',
      themeDesc: 'Vali eelistatud värviteema',
      themeLight: 'Hele',
      themeDark: 'Tume',
      themeSystem: 'Süsteem',
      about: 'Info',
      version: 'v0.1.0',
      aboutText:
        'Jälgi oma harjumusi ja ehita paremaid rutiine. Sinu andmed salvestatakse lokaalselt.',
      data: 'Andmed',
      exportData: 'Ekspordi andmed',
      exportDataDesc: 'Laadi oma andmed alla JSON-ina',
      export: 'Eksport',
    },
    common: {
      days: 'päeva',
      weeks: 'nädalat',
      months: 'kuud',
    },
    weekdays: {
      mon: 'E',
      tue: 'T',
      wed: 'K',
      thu: 'N',
      fri: 'R',
      sat: 'L',
      sun: 'P',
    },
  },

  es: {
    appName: 'Habit Forge',
    nav: {
      today: 'Hoy',
      calendar: 'Calendario',
      achievements: 'Logros',
      settings: 'Ajustes',
    },
    today: {
      title: 'Hoy',
      addGoal: '+ Añadir meta',
      noGoals: 'Sin metas aún',
      noGoalsHint: 'Añade tu primera meta para empezar a seguir',
      catchUp: 'Por recuperar:',
      todayLabel: 'Hoy',
      thisWeek: 'Esta semana',
      thisMonth: 'Este mes',
    },
    goalForm: {
      newGoal: 'Nueva meta',
      editGoal: 'Editar meta',
      icon: 'Icono',
      title: 'Título',
      titlePlaceholder: 'ej., Ejercicio, Lectura, Meditación',
      unit: 'Unidad',
      unitCount: 'Cantidad (veces)',
      unitTime: 'Tiempo (minutos)',
      period: 'Período',
      periodDay: 'Por día',
      periodWeek: 'Por semana',
      periodMonth: 'Por mes',
      target: 'Meta',
      targetCount: 'veces',
      targetMinutes: 'minutos',
      duration: 'Duración',
      durationForever: 'Para siempre',
      durationEndDate: 'Hasta una fecha específica',
      durationPeriods: 'Por N períodos',
      endDate: 'Fecha de fin',
      numberOfPeriods: 'Número de',
      save: 'Guardar',
      create: 'Crear',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      archive: 'Archivar',
      deleteConfirmTitle: 'Eliminar meta',
      deleteConfirmMessage:
        'Estas seguro de que quieres eliminar esta meta? Todos los datos de progreso tambien se eliminaran. Esta accion no se puede deshacer.',
      archiveConfirmTitle: 'Archivar meta',
      archiveConfirmMessage:
        'Archivar esta meta? Se ocultara de la vista de Hoy pero tus datos de progreso se conservaran.',
      confirm: 'Confirmar',
    },
    calendar: {
      title: 'Calendario',
      noGoals: 'Sin metas aún. Crea una meta para ver tu calendario de progreso.',
      selectGoal: 'Selecciona una meta para ver su calendario',
      progress: 'Progreso',
      progressCount: 'cantidad',
      progressMinutes: 'minutos',
      lessThan50: '<50%',
      between50and99: '50-99%',
      between100and199: '100-199%',
      moreThan200: '≥200%',
    },
    achievements: {
      title: 'Logros',
      unlocked: 'Desbloqueado',
      locked: 'Bloqueado',
      unlockedOn: 'Desbloqueado el',
      firstGoal: 'Primeros pasos',
      firstGoalDesc: 'Creaste tu primera meta',
      firstVictory: 'Primera victoria',
      firstVictoryDesc: 'Completaste una meta por primera vez',
      streak3: 'En racha',
      streak3Desc: 'Racha de 3 días',
      streak7: 'Guerrero semanal',
      streak7Desc: 'Racha de 7 días',
      streak30: 'Maestro de hábitos',
      streak30Desc: 'Racha de 30 días',
      perfectWeek: 'Semana perfecta',
      perfectWeekDesc: '100% en todas las metas durante una semana',
      overachiever: 'Superador',
      overachieverDesc: 'Alcanzaste 200% en cualquier meta',
      celebrationTitle: '¡Logro desbloqueado!',
    },
    settings: {
      title: 'Ajustes',
      notifications: 'Notificaciones',
      dailyReminders: 'Recordatorios diarios',
      reminderTime: 'Hora del recordatorio',
      reminderTimeDesc: 'Cuándo enviar recordatorios diarios',
      notifUnsupported: 'Tu navegador no soporta notificaciones',
      notifBlocked:
        'Las notificaciones están bloqueadas. Por favor, habilítalas en los ajustes del navegador.',
      notifClickToEnable: 'Haz clic para habilitar notificaciones',
      notifEnabled: 'Las notificaciones están habilitadas',
      notifDisabled: 'Las notificaciones están deshabilitadas',
      enable: 'Habilitar',
      enabled: 'Habilitado',
      language: 'Idioma',
      languageDesc: 'Elige tu idioma preferido',
      theme: 'Tema',
      themeDesc: 'Elige tu tema de color preferido',
      themeLight: 'Claro',
      themeDark: 'Oscuro',
      themeSystem: 'Sistema',
      about: 'Acerca de',
      version: 'v0.1.0',
      aboutText:
        'Rastrea tus hábitos y construye mejores rutinas. Tus datos se almacenan localmente.',
      data: 'Datos',
      exportData: 'Exportar datos',
      exportDataDesc: 'Descarga tus datos como JSON',
      export: 'Exportar',
    },
    common: {
      days: 'días',
      weeks: 'semanas',
      months: 'meses',
    },
    weekdays: {
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mié',
      thu: 'Jue',
      fri: 'Vie',
      sat: 'Sáb',
      sun: 'Dom',
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  ru: 'Русский',
  fr: 'Français',
  it: 'Italiano',
  ee: 'Eesti',
  es: 'Español',
};
