// Screen name for navigation define
export const ScreenName = {
    startScreen: "StartScreen",
    splashScreen: "SplashScreen",
    login: "Login",
    forgetPassword: "ForgetPassword",
    resetPassword: "ResetPassword",
    changePassword: "ChangePassword",
    changeEmail: "ChangeEmail",
    register: "Register",
    profile: "Profile",
    setting: "Setting",
    theme: "Theme",
    language: "Language",
    courseDetail: "CourseDetail",
    instructorDetail: "InstructorDetail",
    mainTab: "MainTab",
    homeTabNavigation: "HomeTabNavigation",
    homeTab: "HomeTab",
    continueLearning: "ContinueLearning",
    favorites: "Favorites",
    downloadTabNavigation: "DownloadTabNavigation",
    downloadTab: "DownloadTab",
    browseTabNavigation: "BrowseTabNavigation",
    browseTab: "BrowseTab",
    coursesOfCategory: "CoursesOfCategory",
    coursesTopNew: "CoursesTopNew",
    coursesTopSell: "CoursesTopSell",
    coursesTopRate: "CoursesTopRate",
    coursesRecommend: "CoursesRecommend",
    topInstructor: "TopInstructor",
    searchTab: "SearchTab",
    searchResults: "SearchResults",
    searchResultsTabNavigation: "SearchResultsTabNavigation",
    searchAllTab: "SearchAllTab",
    searchCoursesTab: "SearchCoursesTab",
    searchInstructorsTab: "SearchInstructorsTab"
}

// Color code define
export const Colors = {
    transparent: "transparent",
    black: "black",
    dark: "#222222",
    white: "white",
    light: "#eeeeee",
    ghostWhite: "ghostwhite",
    boldGrey: "#383838",
    dimGrey: "dimgrey",
    darkGrey: "darkgrey",
    gainsboro: "gainsboro",
    dodgerBlue: "dodgerblue",
    red: "red",
    green: "green"
};

export const AuthenticationActionTypes = {
    login: "LOGIN",
    logout: "LOGOUT",
    updateProfile: "UPDATE_PROFILE",
    changeEmail: "CHANGE_EMAIL"
}

export const SearchActionTypes = {
    search: "SEARCH",
    changeSearchText: "CHANGE_SEARCH_TEXT",
    clearRecentSearch: "CLEAR_RECENT_SEARCH",
    setRecentSearch: "SET_RECENT_SEARCH"
}

export const CourseDetailActionTypes = {
    setDidUserBuyCourse: "SET_DID_USER_BUY_COURSE",
    setCourseInfo: "SET_COURSE_INFO",
    setCourseSection: "SET_COURSE_SECTION",
    setUserBuyCourse: "SET_USER_BUY_COURSE",
    setUserLikeCourse: "SET_USER_LIKE_COURSE",
    setUserRatingCourse: "SET_USER_RATING_COURSE",
    setCurrentLesson: "SET_CURRENT_LESSON",
    setCurrentTimePlayingVideo: "SET_CURRENT_TIME_PLAYING_VIDEO",
    setProcess: "SET_PROCESS",
    setIsDownloaded: "SET_IS_DOWNLOADED",
    setTotalLessons: "SET_TOTAL_LESSONS",
    closeCourseDetail: "CLOSE_COURSE_DETAIL"
}

export const DownloadActionTypes = {
    setDownloadedCourses: "SET_DOWNLOADED_COURSES",
    startDownload: "START_DOWNLOAD",
    removeDownloadedCourse: "REMOVE_DOWNLOADED_COURSE",
    removeAllDownloadedCourses: "REMOVE_ALL_DOWNLOADED_COURSES"
}