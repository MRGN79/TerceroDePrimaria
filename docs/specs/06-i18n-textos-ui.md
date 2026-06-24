# Textos de UI — referencia i18n (EN)

> Strings visibles de la interfaz como **claves i18n** con su valor EN de referencia.
> Estructura provisional `namespace.componente.elemento` — la **estructura definitiva la fija el Arquitecto** al inicio del proyecto (dependencia abierta).
> Ningún texto va hardcodeado en código. El valor ES real lo aportará el equipo en `/locales/es/`; aquí solo se da EN como referencia del estándar.
> Tono: festivo, simple, apto para niños de 8-9 años.

## Pantalla de inicio (`home`)
| Clave | EN (referencia) |
|---|---|
| `home.title` | "Third Grade Summer!" |
| `home.subtitle` | "Play, learn, and keep your streak going!" |
| `home.playButton` | "Let's play!" |
| `home.printButton` | "Print a worksheet" |
| `home.myBackpackButton` | "My backpack" |
| `home.todayMission` | "Today's mission" |
| `home.startMission` | "Start mission" |

## Perfil / avatar (`profile`)
| Clave | EN |
|---|---|
| `profile.chooseAvatar` | "Pick your character" |
| `profile.chooseNickname` | "Pick a fun nickname" |
| `profile.continue` | "That's me!" |
| `profile.skip` | "Skip" |

## Menú de materias (`subjects`)
| Clave | EN |
|---|---|
| `subjects.title` | "What do you want to play?" |
| `subjects.math` | "Maths" |
| `subjects.spanish` | "Spanish" |
| `subjects.science` | "Nature" |
| `subjects.social` | "Our World" |
| `subjects.english` | "English" |
| `subjects.comingSoon` | "Coming soon" |
| `subjects.grade4Badge` | "Grade 4 Challenge" |

## Sesión de ejercicios (`session`)
| Clave | EN |
|---|---|
| `session.progress` | "Question {current} of {total}" |
| `session.check` | "Check" |
| `session.next` | "Next" |
| `session.tryAgain` | "Try again" |
| `session.showAnswer` | "Show the answer" |
| `session.hint` | "Need a hint?" |
| `session.quit` | "Leave game" |

## Feedback (`feedback`) — variar entre varios
| Clave | EN |
|---|---|
| `feedback.correct.1` | "Awesome!" |
| `feedback.correct.2` | "You're a star!" |
| `feedback.correct.3` | "Brilliant!" |
| `feedback.correct.4` | "Way to go!" |
| `feedback.wrong.1` | "So close! Try again." |
| `feedback.wrong.2` | "Almost! Give it another go." |
| `feedback.correctAnswerWas` | "The answer was: {answer}" |

## Resultado de sesión (`result`)
| Clave | EN |
|---|---|
| `result.title` | "Session complete!" |
| `result.starsEarned` | "You earned {count} stars!" |
| `result.streakUp` | "Your streak is now {days} days!" |
| `result.newBadge` | "New badge unlocked!" |
| `result.playAgain` | "Play again" |
| `result.backHome` | "Back home" |

## Mochila / progreso (`backpack`)
| Clave | EN |
|---|---|
| `backpack.title` | "My backpack" |
| `backpack.totalStars` | "Total stars: {count}" |
| `backpack.currentStreak` | "Current streak: {days} days" |
| `backpack.bestStreak` | "Best streak: {days} days" |
| `backpack.badges` | "My badges" |
| `backpack.streakReset` | "Let's start a brand new streak today!" |

## Medallas (`badges`)
| Clave | EN |
|---|---|
| `badges.firstSession` | "First Steps" |
| `badges.streak3` | "3-Day Streak" |
| `badges.streak7` | "7-Day Streak" |
| `badges.timesTablesMaster` | "Times Tables Master" |
| `badges.explorer` | "Explorer" |
| `badges.braveGrade4` | "Brave Challenger" |
| `badges.hundredStars` | "100 Stars" |

## Zona de impresión (`print`)
| Clave | EN |
|---|---|
| `print.title` | "Print a worksheet" |
| `print.chooseSubject` | "Choose a subject" |
| `print.chooseTopic` | "Choose a topic" |
| `print.includeSolutions` | "Include answer sheet" |
| `print.createButton` | "Create worksheet" |
| `print.printButton` | "Print" |
| `print.worksheetName` | "My name:" |
| `print.worksheetDate` | "Date:" |
| `print.solutionsTitle` | "Answers" |
| `print.encourage` | "You can do it!" |

## Ajustes (`settings`)
| Clave | EN |
|---|---|
| `settings.title` | "Settings" |
| `settings.language` | "Language" |
| `settings.sound` | "Sound" |
| `settings.reducedMotion` | "Calm mode (less movement)" |
| `settings.soundOn` | "On" |
| `settings.soundOff` | "Off" |

## Accesibilidad / aria (`a11y`)
| Clave | EN |
|---|---|
| `a11y.correctIcon` | "Correct answer" |
| `a11y.wrongIcon` | "Incorrect answer" |
| `a11y.starIcon` | "star" |
| `a11y.streakIcon` | "day streak" |
| `a11y.muteToggle` | "Toggle sound" |

> Nota: las claves con `{placeholder}` requieren interpolación. La estructura final (anidada vs. plana, separador, pluralización) la define el Arquitecto con la librería i18n elegida. Recordatorio de UX-UI: prever expansión de texto +30% EN→ES.
