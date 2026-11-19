(() => {
  const root = document.documentElement;
  const body = document.body;
  const backdrop = document.getElementById('settingsBackdrop');
  const settingsButton = document.getElementById('settingsButton');
  const closeButton = document.getElementById('closeSettings');
  const themeButton = document.getElementById('themeToggle');
  const soundButton = document.getElementById('soundToggle');
  const effectsButton = document.getElementById('effectsToggle');
  const aboutButton = document.getElementById('aboutToggle');
  const aboutNote = document.getElementById('aboutNote');
  const languageSelect = document.getElementById('languageSelect');
  const customAccentPicker = document.getElementById('customAccentPicker');
  const customAccentControl = document.getElementById('customAccentControl');
  const customGradientStart = document.getElementById('customGradientStart');
  const customGradientEnd = document.getElementById('customGradientEnd');
  const customGradientControl = document.getElementById('customGradientControl');
  const startupAudio = document.getElementById('startupSound');
  const hoverAudio = document.getElementById('hoverSound');

  const readPref = (key, fallback) => {
    try {
      const value = localStorage.getItem(`pf-${key}`);
      return value === null ? fallback : value === 'true';
    } catch {
      return fallback;
    }
  };
  const readValue = (key, fallback) => {
    try {
      const value = localStorage.getItem(`pf-${key}`);
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  };
  const writePref = (key, value) => {
    try { localStorage.setItem(`pf-${key}`, String(value)); } catch { /* Storage can be disabled. */ }
  };


  const translations = {"uk":{"Home":"Головна","Links":"Посилання","Updates":"Оновлення","Terms":"Умови","Privacy":"Приватність","Main navigation":"Головна навігація","Open settings":"Відкрити налаштування","Close settings":"Закрити налаштування","Discord bot":"Discord-бот","A Discord bot for YouTube notifications and useful server commands.":"Discord-бот для сповіщень YouTube та корисних команд сервера.","Live status not connected":"Статус у реальному часі не підключено","Check the Discord server for updates":"Стежте за оновленнями на Discord-сервері","Invite the bot":"Запросити бота","Join the server":"Приєднатися до сервера","Explore":"Огляд","Useful":"Корисні","Useful links":"Корисні посилання","Find the project’s Discord server, GitHub profile, and YouTube channel.":"Знайдіть Discord-сервер проєкту, профіль GitHub і канал YouTube.","Update log":"Журнал оновлень","See the changes and improvements made to the project website.":"Перегляньте зміни та покращення вебсайту проєкту.","Terms of service":"Умови використання","Read the basic rules for using Project Forsaken Bot.":"Ознайомтеся з основними правилами використання Project Forsaken Bot.","Privacy policy":"Політика конфіденційності","Review the current information about data handling and privacy.":"Перегляньте актуальну інформацію про обробку даних і конфіденційність.","Project Forsaken Bot ·":"Project Forsaken Bot ·","Built by 0twbo":"Створено 0twbo","Project directory":"Каталог проєкту","Official places to find the project and follow its updates.":"Офіційні сторінки проєкту та місця, де можна стежити за оновленнями.","Open profile":"Відкрити профіль","Join":"Приєднатися","Watch":"Дивитися","Project website":"Вебсайт проєкту","Back home":"На головну","Changelog":"Журнал змін","Update":"Оновлення","Log":"Журнал","Website improvements and changes to Project Forsaken Bot.":"Покращення вебсайту та зміни Project Forsaken Bot.","Added a dedicated Gradients collection with Aurora, Sunset, Ocean, Fire, Candy, and Cosmic palettes.":"Додано окрему добірку градієнтів із палітрами «Аврора», «Захід сонця», «Океан», «Вогонь», «Цукерки» та «Космос».","Gradient themes now use real two-color blends across primary buttons, gradient headings, the PF brand mark, ambient accents, and particle colors.":"Градієнтні теми тепер використовують справжні переходи між двома кольорами для основних кнопок, градієнтних заголовків, логотипа PF, фонового підсвічування та частинок.","Added a custom gradient picker with separate start and end colors, saved across all five pages.":"Додано редактор власного градієнта з окремими початковим і кінцевим кольорами; вибір зберігається на всіх п’яти сторінках.","Added a Holidays collection with New Year, Christmas, Halloween, Valentine's Day, Easter, and Summer palettes.":"Додано добірку святкових палітр: Новий рік, Різдво, Гелловін, День святого Валентина, Великдень і Літо.","Gradient and holiday themes work in both dark and light modes and retain the existing single-color themes.":"Градієнтні та святкові теми працюють у темному й світлому режимах, а звичайні однотонні теми залишаються доступними.","Reorganized the color picker into separate Essentials, Nature, Metallics, and Vibrant collections, plus a dedicated Custom section.":"Палітри згруповано в окремі розділи: Основні, Природа, Металіки, Яскраві та Власні кольори.","Added five new palettes: Teal, Lime, Cyan, Magenta, and Orange.":"Додано п’ять нових палітр: бірюзову, лаймову, ціанову, пурпурову та помаранчеву.","Expanded the Settings dialog with a scrollable layout so every theme remains easy to browse on smaller screens.":"Діалог налаштувань отримав прокручування, щоб теми було зручно переглядати навіть на невеликих екранах.","All 14 built-in themes and the custom picker continue to sync across all five pages and support dark and light modes.":"Усі 14 вбудованих тем і власний редактор синхронізуються між п’ятьма сторінками та підтримують темний і світлий режими.","Added Gold, Bronze, and Steel built-in color themes.":"Додано вбудовані теми «Золото», «Бронза» та «Сталь».","Each metallic palette has coordinated dark and light mode colors.":"Кожна металева палітра має узгоджені кольори для темного й світлого режимів.","New themes work with the existing custom color picker and save across all five pages.":"Нові теми працюють разом із редактором власного кольору та зберігаються на всіх п’яти сторінках.","Added a Red color theme to the built-in palette selection.":"До вбудованих палітр додано червону тему.","Added a custom color picker so you can choose your own accent color.":"Додано вибір власного акцентного кольору.","Custom colors are saved and synced across all five website pages, with contrast-aware shades for readability in dark and light modes.":"Власні кольори зберігаються та синхронізуються між усіма п’ятьма сторінками; відтінки адаптуються для читабельності в темному й світлому режимах.","Added five selectable color palettes: Blue, Purple, Emerald, Rose, and Amber.":"Додано п’ять кольорових палітр: синю, фіолетову, смарагдову, рожеву та бурштинову.","Color choices update accents, buttons, highlights, glow effects, and particles across every page.":"Вибраний колір змінює акценти, кнопки, підсвічування, світіння та частинки на всіх сторінках.","Selected color themes are saved and remain active when navigating the website.":"Вибрані кольорові теми зберігаються та залишаються активними під час переходу між сторінками.","Replaced the settings gear with a corrected centered Material Design icon.":"Шестерню налаштувань замінено на виправлену та вирівняну іконку Material Design.","Restored the brand mark to plain PF text instead of the custom vector monogram.":"У логотипі знову використовується звичайний текст PF замість векторної монограми.","Fixed blank icons by embedding SVG markup directly into each page instead of referencing an external SVG sprite.":"Виправлено порожні іконки: SVG-код тепер вбудовано безпосередньо в кожну сторінку замість посилання на зовнішній спрайт.","Improved compatibility when opening the site locally from extracted files.":"Покращено сумісність під час локального відкриття сайту з розпакованих файлів.","Kept the shared icon styling consistent across all five pages.":"Збережено єдиний стиль іконок на всіх п’яти сторінках.","Replaced decorative text characters and emoji-style placeholders with a unified SVG icon set.":"Декоративні символи та емодзі-замінники замінено єдиним набором SVG-іконок.","Added matching SVG icons for navigation settings, page cards, social links, and action buttons.":"Додано узгоджені SVG-іконки для навігації, карток сторінок, соціальних посилань і кнопок дій.","Added dedicated GitHub, Discord, and YouTube brand marks.":"Додано окремі логотипи GitHub, Discord і YouTube.","Added the Settings button and settings dialog to every page.":"На кожну сторінку додано кнопку та діалог налаштувань.","Settings now stay consistent while navigating between pages.":"Налаштування залишаються однаковими під час переходу між сторінками.","Restored randomized particle sizes, speeds, and left-right drifting paths.":"Повернуто випадкові розміри, швидкість і траєкторії руху частинок.","Recorded the latest website refresh and usability improvements.":"Зафіксовано останнє оновлення вебсайту та покращення зручності.","Added the Update Log page.":"Додано сторінку журналу оновлень.","Added a custom Update Log icon.":"Додано власну іконку журналу оновлень.","Improved website consistency.":"Покращено узгодженість оформлення сайту.","Synced particle and glow effects.":"Синхронізовано ефекти частинок і світіння.","Added the Links page.":"Додано сторінку посилань.","Added Terms of Service and Privacy cards.":"Додано картки умов використання та політики конфіденційності.","Improved button hover effects.":"Покращено ефекти наведення на кнопки.","Added the animated background.":"Додано анімований фон.","Added the particle system.":"Додано систему частинок.","Updated the homepage layout.":"Оновлено макет головної сторінки.","Website launched.":"Запуск вебсайту.","Public bot invite made available.":"Відкрито публічне запрошення бота.","Project information":"Інформація про проєкт","Terms of":"Умови","Service":"Використання","Basic conditions for using Project Forsaken Bot.":"Основні умови використання Project Forsaken Bot.","1. Acceptable use":"1. Допустиме використання","Use the bot responsibly and only for its intended features. Do not abuse, spam, exploit, disrupt, or attempt to interfere with the bot or its services.":"Використовуйте бота відповідально та лише за призначенням. Не зловживайте його функціями, не надсилайте спам, не використовуйте вразливості та не намагайтеся порушити роботу бота чи його сервісів.","2. Discord rules":"2. Правила Discord","Your use of the bot must also follow Discord’s Terms of Service and Community Guidelines. Server owners and administrators are responsible for choosing where the bot is added and what permissions it receives.":"Використання бота також має відповідати Умовам використання та Правилам спільноти Discord. Власники й адміністратори серверів відповідають за те, куди додають бота та які дозволи йому надають.","3. Availability and changes":"3. Доступність і зміни","The bot is provided on an “as available” basis. Features may change, be interrupted, or be discontinued. No uninterrupted availability is promised.":"Бот надається за принципом «за наявності». Функції можуть змінюватися, тимчасово перериватися або припинятися. Безперервна доступність не гарантується.","4. Misuse":"4. Неправомірне використання","Access may be restricted where use of the bot harms the service, other users, or the project. The developer is not responsible for problems caused by misuse or by third-party services.":"Доступ може бути обмежено, якщо використання бота шкодить сервісу, іншим користувачам або проєкту. Розробник не відповідає за проблеми, спричинені неправильним використанням або сторонніми сервісами.","5. Updates to these terms":"5. Оновлення цих умов","These terms may be updated as the bot changes. Continued use after an update means you agree to the revised terms.":"Ці умови можуть оновлюватися разом зі змінами бота. Продовжуючи користуватися ботом після оновлення, ви погоджуєтеся з новою редакцією умов.","Your information":"Ваша інформація","Policy":"Політика","An overview of privacy considerations when using Project Forsaken Bot.":"Огляд питань конфіденційності під час використання Project Forsaken Bot.","Information handled by the bot":"Інформація, яку обробляє бот","When you interact with a Discord bot, Discord provides information needed to handle the interaction. Depending on the bot’s enabled features, this can include Discord user, server, and channel identifiers, command input, and server configuration. YouTube notification features may also use public channel and video information.":"Коли ви взаємодієте з Discord-ботом, Discord передає інформацію, необхідну для обробки взаємодії. Залежно від увімкнених функцій бота, це можуть бути ідентифікатори користувачів, серверів і каналів Discord, введені команди та налаштування сервера. Функції сповіщень YouTube також можуть використовувати загальнодоступну інформацію про канали й відео.","How information is used":"Як використовується інформація","Information should be used only to provide, maintain, and troubleshoot the bot’s features. The exact information stored, how long it is kept, and whether it is shared with any other service depend on the bot’s implementation.":"Інформацію слід використовувати лише для надання, підтримки та усунення несправностей функцій бота. Точний перелік даних, що зберігаються, строк їх зберігання та можливе передавання іншим сервісам залежать від реалізації бота.","Data retention and requests":"Зберігання даних і запити","This page does not currently specify storage periods or a data-deletion process. Those details should be confirmed against the bot’s actual code and hosting setup before this policy is treated as complete.":"На цій сторінці наразі не вказано строки зберігання даних або процедуру їх видалення. Ці деталі слід перевірити за фактичним кодом бота та налаштуваннями хостингу, перш ніж вважати політику завершеною.","Transparency note: the previous version said that no personal data was collected. That statement has been removed because the website files alone do not verify what the bot stores or logs. The policy should be completed after checking the bot’s source code and database/logging setup.":"Примітка щодо прозорості: у попередній версії стверджувалося, що персональні дані не збираються. Це твердження прибрано, оскільки самі файли вебсайту не підтверджують, які дані бот зберігає або записує в журнали. Політику слід доповнити після перевірки вихідного коду бота, бази даних і системи журналювання.","Settings":"Налаштування","Language":"Мова","Choose your preferred language":"Оберіть мову вебсайту","Choose language":"Оберіть мову","Theme":"Тема","Switch between dark and light mode":"Перемикайтеся між темним і світлим режимами","Dark on":"Темний режим","Light on":"Світлий режим","Color themes":"Кольорові теми","Browse palettes by collection, or make your own":"Переглядайте палітри за категоріями або створіть власну","Essentials":"Основні","Nature":"Природа","Metallics":"Металіки","Vibrant":"Яскраві","Gradients":"Градієнти","Holidays":"Свята","Custom":"Власні","Single color":"Один колір","Custom gradient":"Власний градієнт","Start":"Початок","End":"Кінець","Sounds":"Звуки","Startup and button hover sounds":"Звук запуску та наведення на кнопки","On":"Увімкнено","Off":"Вимкнено","Visual effects":"Візуальні ефекти","Animated background and floating particles":"Анімований фон і рухомі частинки","About":"Про сайт","Information about this website":"Інформація про цей вебсайт","Show":"Показати","Hide":"Приховати","Project Forsaken is a Discord bot project by 0twbo. This website contains the bot invite, project links, updates, terms, and privacy information.":"Project Forsaken — це проєкт Discord-бота від 0twbo. На цьому вебсайті є запрошення бота, посилання на проєкт, оновлення, умови використання та інформація про конфіденційність.","Blue":"Синій","Purple":"Фіолетовий","Emerald":"Смарагдовий","Rose":"Рожевий","Amber":"Бурштиновий","Red":"Червоний","Gold":"Золотий","Bronze":"Бронзовий","Steel":"Сталевий","Teal":"Бірюзовий","Lime":"Лаймовий","Cyan":"Блакитний","Magenta":"Пурпуровий","Orange":"Помаранчевий","Aurora gradient":"Градієнт «Аврора»","Sunset gradient":"Градієнт «Захід сонця»","Ocean gradient":"Градієнт «Океан»","Fire gradient":"Градієнт «Вогонь»","Candy gradient":"Градієнт «Цукерки»","Cosmic gradient":"Градієнт «Космос»","New Year":"Новий рік","Christmas":"Різдво","Halloween":"Гелловін","Valentine's Day":"День святого Валентина","Easter":"Великдень","Summer":"Літо","Essential color themes":"Основні кольорові теми","Nature color themes":"Природні кольорові теми","Metallic color themes":"Металеві кольорові теми","Vibrant color themes":"Яскраві кольорові теми","Gradient color themes":"Градієнтні теми","Holiday color themes":"Святкові кольорові теми","Custom colors and gradients":"Власні кольори та градієнти","Choose a custom accent color":"Виберіть власний акцентний колір","Custom gradient start color":"Початковий колір власного градієнта","Custom gradient end color":"Кінцевий колір власного градієнта"},"ru":{"Home":"Главная","Links":"Ссылки","Updates":"Обновления","Terms":"Условия","Privacy":"Конфиденциальность","Main navigation":"Главная навигация","Open settings":"Открыть настройки","Close settings":"Закрыть настройки","Discord bot":"Discord-бот","A Discord bot for YouTube notifications and useful server commands.":"Discord-бот для уведомлений YouTube и полезных команд сервера.","Live status not connected":"Статус в реальном времени не подключён","Check the Discord server for updates":"Следите за обновлениями на Discord-сервере","Invite the bot":"Пригласить бота","Join the server":"Присоединиться к серверу","Explore":"Обзор","Useful":"Полезные","Useful links":"Полезные ссылки","Find the project’s Discord server, GitHub profile, and YouTube channel.":"Найдите Discord-сервер проекта, профиль GitHub и канал YouTube.","Update log":"Журнал обновлений","See the changes and improvements made to the project website.":"Посмотрите изменения и улучшения сайта проекта.","Terms of service":"Условия использования","Read the basic rules for using Project Forsaken Bot.":"Ознакомьтесь с основными правилами использования Project Forsaken Bot.","Privacy policy":"Политика конфиденциальности","Review the current information about data handling and privacy.":"Ознакомьтесь с актуальной информацией об обработке данных и конфиденциальности.","Project Forsaken Bot ·":"Project Forsaken Bot ·","Built by 0twbo":"Создано 0twbo","Project directory":"Каталог проекта","Official places to find the project and follow its updates.":"Официальные страницы проекта и места, где можно следить за обновлениями.","Open profile":"Открыть профиль","Join":"Присоединиться","Watch":"Смотреть","Project website":"Сайт проекта","Back home":"На главную","Changelog":"История изменений","Update":"Обновления","Log":"Журнал","Website improvements and changes to Project Forsaken Bot.":"Улучшения сайта и изменения Project Forsaken Bot.","Added a dedicated Gradients collection with Aurora, Sunset, Ocean, Fire, Candy, and Cosmic palettes.":"Добавлена отдельная коллекция градиентов с палитрами «Аврора», «Закат», «Океан», «Огонь», «Конфеты» и «Космос».","Gradient themes now use real two-color blends across primary buttons, gradient headings, the PF brand mark, ambient accents, and particle colors.":"Градиентные темы теперь используют настоящие переходы между двумя цветами для основных кнопок, градиентных заголовков, логотипа PF, фоновой подсветки и частиц.","Added a custom gradient picker with separate start and end colors, saved across all five pages.":"Добавлен редактор собственного градиента с отдельными начальным и конечным цветами; выбор сохраняется на всех пяти страницах.","Added a Holidays collection with New Year, Christmas, Halloween, Valentine's Day, Easter, and Summer palettes.":"Добавлена коллекция праздничных палитр: Новый год, Рождество, Хэллоуин, День святого Валентина, Пасха и Лето.","Gradient and holiday themes work in both dark and light modes and retain the existing single-color themes.":"Градиентные и праздничные темы работают в тёмном и светлом режимах, а однотонные темы остаются доступными.","Reorganized the color picker into separate Essentials, Nature, Metallics, and Vibrant collections, plus a dedicated Custom section.":"Палитры разделены на отдельные коллекции: Основные, Природа, Металлики, Яркие и Пользовательские цвета.","Added five new palettes: Teal, Lime, Cyan, Magenta, and Orange.":"Добавлены пять новых палитр: бирюзовая, лаймовая, циановая, пурпурная и оранжевая.","Expanded the Settings dialog with a scrollable layout so every theme remains easy to browse on smaller screens.":"Диалог настроек получил прокрутку, чтобы темы было удобно просматривать даже на небольших экранах.","All 14 built-in themes and the custom picker continue to sync across all five pages and support dark and light modes.":"Все 14 встроенных тем и пользовательский редактор синхронизируются между пятью страницами и поддерживают тёмный и светлый режимы.","Added Gold, Bronze, and Steel built-in color themes.":"Добавлены встроенные цветовые темы «Золото», «Бронза» и «Сталь».","Each metallic palette has coordinated dark and light mode colors.":"Для каждой металлической палитры подобраны цвета для тёмного и светлого режимов.","New themes work with the existing custom color picker and save across all five pages.":"Новые темы работают с существующим редактором цвета и сохраняются на всех пяти страницах.","Added a Red color theme to the built-in palette selection.":"В набор встроенных палитр добавлена красная тема.","Added a custom color picker so you can choose your own accent color.":"Добавлен выбор собственного акцентного цвета.","Custom colors are saved and synced across all five website pages, with contrast-aware shades for readability in dark and light modes.":"Пользовательские цвета сохраняются и синхронизируются на всех пяти страницах; оттенки адаптируются для читаемости в тёмном и светлом режимах.","Added five selectable color palettes: Blue, Purple, Emerald, Rose, and Amber.":"Добавлены пять цветовых палитр: синяя, фиолетовая, изумрудная, розовая и янтарная.","Color choices update accents, buttons, highlights, glow effects, and particles across every page.":"Выбранный цвет меняет акценты, кнопки, подсветку, свечение и частицы на всех страницах.","Selected color themes are saved and remain active when navigating the website.":"Выбранные цветовые темы сохраняются и остаются активными при переходе между страницами.","Replaced the settings gear with a corrected centered Material Design icon.":"Шестерёнка настроек заменена исправленной и выровненной иконкой Material Design.","Restored the brand mark to plain PF text instead of the custom vector monogram.":"В логотип возвращён обычный текст PF вместо векторной монограммы.","Fixed blank icons by embedding SVG markup directly into each page instead of referencing an external SVG sprite.":"Исправлены пустые иконки: SVG-код теперь встроен непосредственно в каждую страницу вместо ссылки на внешний спрайт.","Improved compatibility when opening the site locally from extracted files.":"Улучшена совместимость при локальном открытии сайта из распакованных файлов.","Kept the shared icon styling consistent across all five pages.":"Сохранён единый стиль иконок на всех пяти страницах.","Replaced decorative text characters and emoji-style placeholders with a unified SVG icon set.":"Декоративные символы и эмодзи-заполнители заменены единым набором SVG-иконок.","Added matching SVG icons for navigation settings, page cards, social links, and action buttons.":"Добавлены согласованные SVG-иконки для настроек навигации, карточек страниц, социальных ссылок и кнопок действий.","Added dedicated GitHub, Discord, and YouTube brand marks.":"Добавлены отдельные логотипы GitHub, Discord и YouTube.","Added the Settings button and settings dialog to every page.":"На каждую страницу добавлены кнопка и диалог настроек.","Settings now stay consistent while navigating between pages.":"Настройки остаются одинаковыми при переходе между страницами.","Restored randomized particle sizes, speeds, and left-right drifting paths.":"Возвращены случайные размеры частиц, скорость и траектории движения влево-вправо.","Recorded the latest website refresh and usability improvements.":"Зафиксировано последнее обновление сайта и улучшения удобства.","Added the Update Log page.":"Добавлена страница журнала обновлений.","Added a custom Update Log icon.":"Добавлена собственная иконка журнала обновлений.","Improved website consistency.":"Улучшена согласованность оформления сайта.","Synced particle and glow effects.":"Синхронизированы эффекты частиц и свечения.","Added the Links page.":"Добавлена страница ссылок.","Added Terms of Service and Privacy cards.":"Добавлены карточки условий использования и политики конфиденциальности.","Improved button hover effects.":"Улучшены эффекты наведения на кнопки.","Added the animated background.":"Добавлен анимированный фон.","Added the particle system.":"Добавлена система частиц.","Updated the homepage layout.":"Обновлена структура главной страницы.","Website launched.":"Запуск сайта.","Public bot invite made available.":"Открыто публичное приглашение бота.","Project information":"Информация о проекте","Terms of":"Условия","Service":"Использования","Basic conditions for using Project Forsaken Bot.":"Основные условия использования Project Forsaken Bot.","1. Acceptable use":"1. Допустимое использование","Use the bot responsibly and only for its intended features. Do not abuse, spam, exploit, disrupt, or attempt to interfere with the bot or its services.":"Используйте бота ответственно и только по назначению. Не злоупотребляйте его функциями, не отправляйте спам, не используйте уязвимости и не пытайтесь нарушить работу бота или его сервисов.","2. Discord rules":"2. Правила Discord","Your use of the bot must also follow Discord’s Terms of Service and Community Guidelines. Server owners and administrators are responsible for choosing where the bot is added and what permissions it receives.":"Использование бота также должно соответствовать Условиям использования и Правилам сообщества Discord. Владельцы и администраторы серверов отвечают за то, куда добавляется бот и какие разрешения ему предоставляются.","3. Availability and changes":"3. Доступность и изменения","The bot is provided on an “as available” basis. Features may change, be interrupted, or be discontinued. No uninterrupted availability is promised.":"Бот предоставляется по принципу «при наличии». Функции могут изменяться, временно прерываться или прекращаться. Бесперебойная доступность не гарантируется.","4. Misuse":"4. Неправомерное использование","Access may be restricted where use of the bot harms the service, other users, or the project. The developer is not responsible for problems caused by misuse or by third-party services.":"Доступ может быть ограничен, если использование бота наносит вред сервису, другим пользователям или проекту. Разработчик не отвечает за проблемы, вызванные неправильным использованием или сторонними сервисами.","5. Updates to these terms":"5. Обновления этих условий","These terms may be updated as the bot changes. Continued use after an update means you agree to the revised terms.":"Эти условия могут обновляться по мере изменения бота. Продолжая пользоваться ботом после обновления, вы соглашаетесь с новой редакцией условий.","Your information":"Ваша информация","Policy":"Политика","An overview of privacy considerations when using Project Forsaken Bot.":"Обзор вопросов конфиденциальности при использовании Project Forsaken Bot.","Information handled by the bot":"Информация, обрабатываемая ботом","When you interact with a Discord bot, Discord provides information needed to handle the interaction. Depending on the bot’s enabled features, this can include Discord user, server, and channel identifiers, command input, and server configuration. YouTube notification features may also use public channel and video information.":"Когда вы взаимодействуете с Discord-ботом, Discord передаёт информацию, необходимую для обработки взаимодействия. В зависимости от включённых функций бота это могут быть идентификаторы пользователей, серверов и каналов Discord, введённые команды и настройки сервера. Функции уведомлений YouTube также могут использовать общедоступную информацию о каналах и видео.","How information is used":"Как используется информация","Information should be used only to provide, maintain, and troubleshoot the bot’s features. The exact information stored, how long it is kept, and whether it is shared with any other service depend on the bot’s implementation.":"Информация должна использоваться только для предоставления, поддержки и устранения неполадок функций бота. Точный перечень сохраняемых данных, срок их хранения и возможная передача другим сервисам зависят от реализации бота.","Data retention and requests":"Хранение данных и запросы","This page does not currently specify storage periods or a data-deletion process. Those details should be confirmed against the bot’s actual code and hosting setup before this policy is treated as complete.":"На этой странице пока не указаны сроки хранения данных или процедура их удаления. Эти сведения следует проверить по фактическому коду бота и настройкам хостинга, прежде чем считать политику завершённой.","Transparency note: the previous version said that no personal data was collected. That statement has been removed because the website files alone do not verify what the bot stores or logs. The policy should be completed after checking the bot’s source code and database/logging setup.":"Примечание о прозрачности: в предыдущей версии утверждалось, что персональные данные не собираются. Это утверждение удалено, поскольку одни только файлы сайта не подтверждают, какие данные бот хранит или записывает в журналы. Политику следует дополнить после проверки исходного кода бота, базы данных и системы журналирования.","Settings":"Настройки","Language":"Язык","Choose your preferred language":"Выберите язык сайта","Choose language":"Выбрать язык","Theme":"Тема","Switch between dark and light mode":"Переключение между тёмным и светлым режимами","Dark on":"Тёмная тема","Light on":"Светлая тема","Color themes":"Цветовые темы","Browse palettes by collection, or make your own":"Просматривайте палитры по категориям или создайте свою","Essentials":"Основные","Nature":"Природа","Metallics":"Металлики","Vibrant":"Яркие","Gradients":"Градиенты","Holidays":"Праздники","Custom":"Свои","Single color":"Один цвет","Custom gradient":"Свой градиент","Start":"Начало","End":"Конец","Sounds":"Звуки","Startup and button hover sounds":"Звук запуска и наведения на кнопки","On":"Включено","Off":"Выключено","Visual effects":"Визуальные эффекты","Animated background and floating particles":"Анимированный фон и парящие частицы","About":"О сайте","Information about this website":"Информация об этом сайте","Show":"Показать","Hide":"Скрыть","Project Forsaken is a Discord bot project by 0twbo. This website contains the bot invite, project links, updates, terms, and privacy information.":"Project Forsaken — проект Discord-бота от 0twbo. На этом сайте находятся приглашение бота, ссылки проекта, обновления, условия использования и сведения о конфиденциальности.","Blue":"Синий","Purple":"Фиолетовый","Emerald":"Изумрудный","Rose":"Розовый","Amber":"Янтарный","Red":"Красный","Gold":"Золотой","Bronze":"Бронзовый","Steel":"Стальной","Teal":"Бирюзовый","Lime":"Лаймовый","Cyan":"Голубой","Magenta":"Пурпурный","Orange":"Оранжевый","Aurora gradient":"Градиент «Аврора»","Sunset gradient":"Градиент «Закат»","Ocean gradient":"Градиент «Океан»","Fire gradient":"Градиент «Огонь»","Candy gradient":"Градиент «Конфеты»","Cosmic gradient":"Градиент «Космос»","New Year":"Новый год","Christmas":"Рождество","Halloween":"Хэллоуин","Valentine's Day":"День святого Валентина","Easter":"Пасха","Summer":"Лето","Essential color themes":"Основные цветовые темы","Nature color themes":"Природные цветовые темы","Metallic color themes":"Металлические цветовые темы","Vibrant color themes":"Яркие цветовые темы","Gradient color themes":"Градиентные темы","Holiday color themes":"Праздничные цветовые темы","Custom colors and gradients":"Свои цвета и градиенты","Choose a custom accent color":"Выберите свой акцентный цвет","Custom gradient start color":"Начальный цвет своего градиента","Custom gradient end color":"Конечный цвет своего градиента"}};

  Object.assign(translations.uk, {"Discord server":"Discord-сервер","Added language selection in Settings with English, Ukrainian, and Russian translations.":"Додано вибір мови в налаштуваннях: англійська, українська та російська.","Language choice is saved and stays in sync across all five pages.":"Вибір мови зберігається та синхронізується на всіх п’яти сторінках.","Translated navigation, page content, update log, terms, privacy information, and Settings labels.":"Перекладено навігацію, вміст сторінок, журнал оновлень, умови, інформацію про конфіденційність і підписи налаштувань.","Changed theme collections into expandable accordion sections to keep Settings compact.":"Колекції тем перетворено на розгортні секції-акордеони, щоб зробити налаштування компактнішими."});
  Object.assign(translations.ru, {"Discord server":"Discord-сервер","Added language selection in Settings with English, Ukrainian, and Russian translations.":"Добавлен выбор языка в настройках: английский, украинский и русский.","Language choice is saved and stays in sync across all five pages.":"Выбор языка сохраняется и синхронизируется на всех пяти страницах.","Translated navigation, page content, update log, terms, privacy information, and Settings labels.":"Переведены навигация, содержимое страниц, журнал обновлений, условия, информация о конфиденциальности и подписи настроек.","Changed theme collections into expandable accordion sections to keep Settings compact.":"Коллекции тем превращены в раскрывающиеся секции-аккордеоны, чтобы сделать настройки компактнее."});
  const availableLanguages = ['en', 'uk', 'ru'];
  const originalTextNodes = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalDocumentTitle = document.title;
  const originalMetaDescription = document.querySelector('meta[name="description"]')?.content || '';
  const t = (phrase) => (translations[preferences.language] && translations[preferences.language][phrase]) || phrase;

  function translateDocument() {
    const dictionary = translations[preferences.language] || {};
    document.documentElement.lang = preferences.language;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest('script,style,svg,select,option,[data-i18n-skip]')) continue;
      if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
      const original = originalTextNodes.get(node);
      const trimmed = original.trim();
      if (!trimmed) continue;
      const translated = dictionary[trimmed] || trimmed;
      const leading = original.match(/^\s*/)?.[0] || '';
      const trailing = original.match(/\s*$/)?.[0] || '';
      node.nodeValue = `${leading}${translated}${trailing}`;
    }

    document.querySelectorAll('[aria-label],[title],[placeholder]').forEach((element) => {
      let saved = originalAttributes.get(element);
      if (!saved) { saved = {}; originalAttributes.set(element, saved); }
      ['aria-label', 'title', 'placeholder'].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        if (!(attribute in saved)) saved[attribute] = element.getAttribute(attribute);
        const original = saved[attribute];
        element.setAttribute(attribute, dictionary[original] || original);
      });
    });

    const titleKey = originalDocumentTitle;
    const pageTitles = {
      'Links · Project Forsaken': { uk: 'Посилання · Project Forsaken', ru: 'Ссылки · Project Forsaken' },
      'Update Log · Project Forsaken': { uk: 'Журнал оновлень · Project Forsaken', ru: 'Журнал обновлений · Project Forsaken' },
      'Terms of Service · Project Forsaken': { uk: 'Умови використання · Project Forsaken', ru: 'Условия использования · Project Forsaken' },
      'Privacy Policy · Project Forsaken': { uk: 'Політика конфіденційності · Project Forsaken', ru: 'Политика конфиденциальности · Project Forsaken' },
      'Project Forsaken Bot': { uk: 'Project Forsaken Bot', ru: 'Project Forsaken Bot' }
    };
    document.title = pageTitles[titleKey]?.[preferences.language] || titleKey;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      const descriptions = {
        'Terms for using Project Forsaken Bot.': { uk: 'Умови використання Project Forsaken Bot.', ru: 'Условия использования Project Forsaken Bot.' },
        'Privacy information for Project Forsaken Bot.': { uk: 'Інформація про конфіденційність Project Forsaken Bot.', ru: 'Информация о конфиденциальности Project Forsaken Bot.' },
        'Project Forsaken Bot — Discord commands and YouTube notifications.': { uk: 'Project Forsaken Bot — команди Discord і сповіщення YouTube.', ru: 'Project Forsaken Bot — команды Discord и уведомления YouTube.' }
      };
      const original = originalMetaDescription;
      meta.content = descriptions[original]?.[preferences.language] || original;
    }
  }

  const gradientPalettes = {
    'gradient-aurora': ['#18c9b8', '#7958e8'],
    'gradient-sunset': ['#f04f88', '#f39a35'],
    'gradient-ocean': ['#1769c2', '#19c6d2'],
    'gradient-fire': ['#d82e48', '#f28b26'],
    'gradient-candy': ['#e84fa8', '#7955d9'],
    'gradient-cosmic': ['#272b83', '#c14edb'],
    'holiday-new-year': ['#183b78', '#dcb64b'],
    'holiday-christmas': ['#176b48', '#c9364b'],
    'holiday-halloween': ['#5a2a91', '#ef8424'],
    'holiday-valentines': ['#e94c83', '#9144c8'],
    'holiday-easter': ['#a27add', '#55c9a5'],
    'holiday-summer': ['#ef713d', '#21b8c4']
  };
  const availableAccents = ['blue', 'purple', 'emerald', 'rose', 'amber', 'red', 'gold', 'bronze', 'steel', 'teal', 'lime', 'cyan', 'magenta', 'orange', ...Object.keys(gradientPalettes), 'gradient-custom'];
  const isHexColor = (value) => /^#[0-9a-f]{6}$/i.test(value);
  const savedAccent = readValue('accent-theme', 'blue');
  const savedCustomColor = readValue('custom-accent', '#328cff');
  const savedGradientStart = readValue('custom-gradient-start', '#328cff');
  const savedGradientEnd = readValue('custom-gradient-end', '#a855f7');
  const preferences = {
    light: readPref('light-theme', false),
    language: availableLanguages.includes(readValue('language', 'en')) ? readValue('language', 'en') : 'en',
    accent: availableAccents.includes(savedAccent) || savedAccent === 'custom' ? savedAccent : 'blue',
    customColor: isHexColor(savedCustomColor) ? savedCustomColor : '#328cff',
    gradientStart: isHexColor(savedGradientStart) ? savedGradientStart : '#328cff',
    gradientEnd: isHexColor(savedGradientEnd) ? savedGradientEnd : '#a855f7',
    sound: readPref('sound', true),
    effects: readPref('effects', true)
  };

  const hexToRgb = (hex) => {
    const value = hex.replace('#', '');
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16)
    };
  };
  const rgbToHex = ({ r, g, b }) => `#${[r, g, b].map((part) => Math.round(part).toString(16).padStart(2, '0')).join('')}`;
  const mixColors = (firstHex, secondHex, secondWeight) => {
    const first = hexToRgb(firstHex);
    const second = hexToRgb(secondHex);
    const weight = Math.max(0, Math.min(1, secondWeight));
    return rgbToHex({
      r: first.r * (1 - weight) + second.r * weight,
      g: first.g * (1 - weight) + second.g * weight,
      b: first.b * (1 - weight) + second.b * weight
    });
  };
  const luminance = (hex) => {
    const channels = Object.values(hexToRgb(hex)).map((part) => {
      const value = part / 255;
      return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
    });
    return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
  };
  const contrastRatio = (firstHex, secondHex) => {
    const values = [luminance(firstHex), luminance(secondHex)].sort((a, b) => b - a);
    return (values[0] + .05) / (values[1] + .05);
  };
  const ensureContrast = (color, background, minimum) => {
    if (contrastRatio(color, background) >= minimum) return color;
    const target = luminance(background) > .5 ? '#000000' : '#ffffff';
    for (let step = 1; step <= 100; step += 1) {
      const candidate = mixColors(color, target, step / 100);
      if (contrastRatio(candidate, background) >= minimum) return candidate;
    }
    return target;
  };
  const rgbChannels = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    return `${r}, ${g}, ${b}`;
  };

  function clearCustomAccentVariables() {
    [
      '--accent-light', '--accent', '--accent-strong', '--accent-rgb', '--accent-strong-rgb',
      '--brand-a', '--brand-b', '--border', '--bg-alt', '--bg-tint',
      '--gradient-start', '--gradient-end', '--accent-gradient', '--gradient-text'
    ].forEach((name) => root.style.removeProperty(name));
  }

  function applyCustomAccentVariables() {
    const chosen = preferences.customColor;
    const lightMode = preferences.light;
    const background = lightMode ? '#e9f1ff' : '#080d18';
    const readableAccent = ensureContrast(chosen, background, 4.5);
    const buttonAccent = ensureContrast(chosen, '#ffffff', 4.5);
    const buttonLight = ensureContrast(mixColors(buttonAccent, '#ffffff', .09), '#ffffff', 4.5);
    const glowAccent = lightMode ? readableAccent : ensureContrast(mixColors(readableAccent, '#ffffff', .12), background, 4.5);
    const strongRgb = rgbChannels(buttonAccent);
    const accentRgb = rgbChannels(readableAccent);
    const backgroundAlt = lightMode ? mixColors('#d7e6ff', chosen, .055) : mixColors('#101c32', chosen, .10);
    const backgroundTint = lightMode ? mixColors('#eef5ff', chosen, .025) : mixColors('#0a1425', chosen, .075);

    root.style.setProperty('--accent-light', buttonLight);
    root.style.setProperty('--accent', glowAccent);
    root.style.setProperty('--accent-strong', buttonAccent);
    root.style.setProperty('--accent-rgb', accentRgb);
    root.style.setProperty('--accent-strong-rgb', strongRgb);
    root.style.setProperty('--brand-a', buttonLight);
    root.style.setProperty('--brand-b', buttonAccent);
    root.style.setProperty('--border', `rgba(${accentRgb}, .2)`);
    root.style.setProperty('--bg-alt', backgroundAlt);
    root.style.setProperty('--bg-tint', backgroundTint);
  }

  function applyGradientAccentVariables() {
    const palette = preferences.accent === 'gradient-custom'
      ? [preferences.gradientStart, preferences.gradientEnd]
      : gradientPalettes[preferences.accent];
    if (!palette) return;

    const [start, end] = palette;
    const lightMode = preferences.light;
    const background = lightMode ? '#e9f1ff' : '#080d18';
    const middle = mixColors(start, end, .5);
    const readableStart = ensureContrast(start, background, 4.5);
    const readableMiddle = ensureContrast(middle, background, 4.5);
    const readableEnd = ensureContrast(end, background, 4.5);
    const buttonStart = ensureContrast(start, '#ffffff', 4.5);
    const buttonEnd = ensureContrast(end, '#ffffff', 4.5);
    const accentRgb = rgbChannels(readableMiddle);
    const strongRgb = rgbChannels(buttonEnd);
    const backgroundAlt = lightMode ? mixColors('#d7e6ff', middle, .055) : mixColors('#101c32', middle, .10);
    const backgroundTint = lightMode ? mixColors('#eef5ff', middle, .025) : mixColors('#0a1425', middle, .075);

    root.style.setProperty('--accent-light', readableStart);
    root.style.setProperty('--accent', readableMiddle);
    root.style.setProperty('--accent-strong', readableEnd);
    root.style.setProperty('--accent-rgb', accentRgb);
    root.style.setProperty('--accent-strong-rgb', strongRgb);
    root.style.setProperty('--brand-a', buttonStart);
    root.style.setProperty('--brand-b', buttonEnd);
    root.style.setProperty('--border', `rgba(${accentRgb}, .22)`);
    root.style.setProperty('--bg-alt', backgroundAlt);
    root.style.setProperty('--bg-tint', backgroundTint);
    root.style.setProperty('--gradient-start', readableStart);
    root.style.setProperty('--gradient-end', readableEnd);
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${buttonStart}, ${buttonEnd})`);
    root.style.setProperty('--gradient-text', `linear-gradient(90deg, ${readableStart}, ${readableMiddle}, ${readableEnd})`);
  }

  function updateSettingsLabels() {
    if (themeButton) themeButton.textContent = preferences.light ? t('Light on') : t('Dark on');
    if (soundButton) soundButton.textContent = preferences.sound ? t('On') : t('Off');
    if (effectsButton) effectsButton.textContent = preferences.effects ? t('On') : t('Off');
    if (aboutButton) aboutButton.textContent = aboutButton.getAttribute('aria-expanded') === 'true' ? t('Hide') : t('Show');
    if (languageSelect) languageSelect.value = preferences.language;
    document.querySelectorAll('[data-accent-choice]').forEach((button) => {
      const selected = button.dataset.accentChoice === preferences.accent;
      button.setAttribute('aria-pressed', String(selected));
    });
    if (customAccentPicker) customAccentPicker.value = preferences.customColor;
    customAccentControl?.classList.toggle('is-active', preferences.accent === 'custom');
    if (customGradientStart) customGradientStart.value = preferences.gradientStart;
    if (customGradientEnd) customGradientEnd.value = preferences.gradientEnd;
    customGradientControl?.classList.toggle('is-active', preferences.accent === 'gradient-custom');
  }

  function applyPreferences() {
    root.dataset.theme = preferences.light ? 'light' : 'dark';
    root.dataset.accent = preferences.accent;
    clearCustomAccentVariables();
    if (preferences.accent === 'custom') applyCustomAccentVariables();
    else if (preferences.accent === 'gradient-custom' || gradientPalettes[preferences.accent]) applyGradientAccentVariables();
    body.classList.toggle('effects-off', !preferences.effects);
    translateDocument();
    updateSettingsLabels();
    writePref('light-theme', preferences.light);
    writePref('language', preferences.language);
    writePref('accent-theme', preferences.accent);
    writePref('custom-accent', preferences.customColor);
    writePref('custom-gradient-start', preferences.gradientStart);
    writePref('custom-gradient-end', preferences.gradientEnd);
    writePref('sound', preferences.sound);
    writePref('effects', preferences.effects);
    renderParticles();
  }

  function renderParticles() {
    const layer = document.getElementById('particles');
    if (!layer) return;
    layer.replaceChildren();
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!preferences.effects || reducedMotion) return;
    // Bring back the original lively field: more particles, wider size variation,
    // and a different left/right weave for every particle.
    const count = window.innerWidth < 700 ? 56 : 110;
    const accent = getComputedStyle(root);
    const particleColors = [accent.getPropertyValue('--accent').trim(), accent.getPropertyValue('--gradient-start').trim() || accent.getPropertyValue('--accent-light').trim(), accent.getPropertyValue('--gradient-end').trim() || accent.getPropertyValue('--accent-strong').trim(), '#ffffff'];
    const randomWeave = () => `${Math.round(Math.random() * 120 - 60)}px`;

    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement('span');
      const size = Math.random() * 5.5 + 3;
      particle.className = 'particle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = String(Math.random() * .62 + .16);
      particle.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.style.animationDuration = `${5 + Math.random() * 12}s`;
      particle.style.animationDelay = `${-Math.random() * 17}s`;
      particle.style.setProperty('--weave-1', randomWeave());
      particle.style.setProperty('--weave-2', randomWeave());
      particle.style.setProperty('--weave-3', randomWeave());
      particle.style.setProperty('--weave-4', randomWeave());
      if (Math.random() < .3) particle.style.filter = 'blur(2px)';
      layer.append(particle);
    }
  }

  function openSettings() {
    if (!backdrop) return;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    settingsButton?.setAttribute('aria-expanded', 'true');
    closeButton?.focus();
  }
  function closeSettings() {
    if (!backdrop) return;
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    settingsButton?.setAttribute('aria-expanded', 'false');
    settingsButton?.focus();
  }

  settingsButton?.addEventListener('click', openSettings);
  closeButton?.addEventListener('click', closeSettings);
  backdrop?.addEventListener('click', (event) => {
    if (event.target === backdrop) closeSettings();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && backdrop?.classList.contains('open')) closeSettings();
  });

  languageSelect?.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    preferences.language = availableLanguages.includes(selectedLanguage) ? selectedLanguage : 'en';
    applyPreferences();
  });

  themeButton?.addEventListener('click', () => {
    preferences.light = !preferences.light;
    applyPreferences();
  });
  document.querySelectorAll('[data-accent-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const selectedAccent = button.dataset.accentChoice;
      if (!availableAccents.includes(selectedAccent)) return;
      preferences.accent = selectedAccent;
      applyPreferences();
    });
  });
  customAccentPicker?.addEventListener('input', () => {
    const selectedColor = customAccentPicker.value.toLowerCase();
    if (!isHexColor(selectedColor)) return;
    preferences.customColor = selectedColor;
    preferences.accent = 'custom';
    applyPreferences();
  });
  function updateCustomGradient() {
    const start = customGradientStart?.value.toLowerCase();
    const end = customGradientEnd?.value.toLowerCase();
    if (!isHexColor(start) || !isHexColor(end)) return;
    preferences.gradientStart = start;
    preferences.gradientEnd = end;
    preferences.accent = 'gradient-custom';
    applyPreferences();
  }
  customGradientStart?.addEventListener('input', updateCustomGradient);
  customGradientEnd?.addEventListener('input', updateCustomGradient);
  soundButton?.addEventListener('click', () => {
    preferences.sound = !preferences.sound;
    applyPreferences();
  });
  effectsButton?.addEventListener('click', () => {
    preferences.effects = !preferences.effects;
    applyPreferences();
  });
  aboutButton?.addEventListener('click', () => {
    const expanded = aboutButton.getAttribute('aria-expanded') === 'true';
    aboutButton.setAttribute('aria-expanded', String(!expanded));
    aboutNote?.classList.toggle('show', !expanded);
    aboutButton.textContent = expanded ? t('Show') : t('Hide');
  });

  let startupPlayed = false;
  function playStartupSound() {
    if (!preferences.sound || startupPlayed || !startupAudio) return;
    startupAudio.volume = .3;
    const playback = startupAudio.play();
    if (playback && typeof playback.then === 'function') {
      playback.then(() => { startupPlayed = true; }).catch(() => { /* Try again after another user gesture. */ });
    } else {
      startupPlayed = true;
    }
  }
  document.addEventListener('pointerdown', playStartupSound);
  document.addEventListener('keydown', playStartupSound);

  document.querySelectorAll('a.button, button').forEach((element) => {
    element.addEventListener('pointerenter', () => {
      if (!preferences.sound || !hoverAudio) return;
      hoverAudio.currentTime = 0;
      hoverAudio.volume = .13;
      hoverAudio.play().catch(() => { /* Hover sounds are optional. */ });
    });
  });

  applyPreferences();
  window.addEventListener('resize', () => {
    clearTimeout(window.__pfParticleResize);
    window.__pfParticleResize = setTimeout(renderParticles, 180);
  }, { passive: true });
})();
