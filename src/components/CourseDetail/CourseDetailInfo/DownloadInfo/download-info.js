import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import * as FileSystem from 'expo-file-system';

import { ThemeContext } from '../../../../contexts/theme-context';
import { Colors } from '../../../../globals/constants';
import Utilities from '../../../../core/fwk/utilities';
import { LanguageContext } from '../../../../contexts/language-context';
import { AuthenticationContext } from '../../../../contexts/authentication-context';
import { DownloadContext } from '../../../../contexts/download-context';
import { setIsDownloaded } from '../../../../actions/course-detail-action';

const DownloadInfo = (props) => {
    const {theme} = useContext(ThemeContext);
    const langContext = useContext(LanguageContext);
    const authContext = useContext(AuthenticationContext);
    const downloadContext = useContext(DownloadContext);

    const [downloadPreparing, setDownloadPreparing] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(null);
    const [downloadedLessons, setDownloadedLessons] = useState(0);

    useEffect(() => {
        if (props.state.totalLessons)
            if (downloadContext.state.downloadedCourses.includes(props.state.courseInfo.id)) {
                setIsDownloaded(props.dispatch, true);
                setDownloadedLessons(props.state.totalLessons);
            } else setIsDownloaded(props.dispatch, false);
    }, [props.state.totalLessons])

    const onPressDownload = async () => {
        if (!authContext.state.authenticated) {
            alert(langContext.state.translation["loginRequireAction"]);
        } else if (!props.state.userBuyCourse) {
            alert(langContext.state.translation["paymentRequireAction"]);
        } else if (downloading) {
            alert(langContext.state.translation["courseDownloadingAlert"]);
        } else {
            // Function Prepare list url to download
            const getListToDownload = async () => {
                if (!downloadContext.state.downloadedCourses.includes(props.state.courseInfo.id)) {
                    let toDownload = [];
                    for (const section of props.state.courseInfo.section) {
                        for (const lesson of section.lesson)
                            toDownload.push({ id: lesson.id, url: lesson.videoUrl});
                    }
                    return toDownload;
                } else return [];
            }
        
            // Callback function for FileSystem.createDownloadResumable
            const callback = async downloadProgress => {
                const progress = await downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
                setDownloadProgress(progress * 100);
            };

            // Download list resource
            const download = async (toDownload) => {
                for (const item of toDownload) {
                    await FileSystem.createDownloadResumable(item.url, FileSystem.documentDirectory + props.state.courseInfo.id + `/${item.id}.mp4`, {}, callback)
                    .downloadAsync()
                        .then(status => setDownloadedLessons(downloadedLessons + 1))
                        .catch(error => alert(error));
                }
                await downloadContext.addDownloadedCourse(props.state.courseInfo);
                setDownloadProgress(null);
                setDownloading(false);
                setIsDownloaded(props.dispatch, true);
            }

            setDownloadPreparing(true);
            // Prepare list resource to download
            const toDownload = await getListToDownload();
            setDownloadPreparing(false);
            if (toDownload.length > 0) {
                setDownloading(true);
                const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + props.state.courseInfo.id);
                if (!dirInfo.exists) {
                    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + props.state.courseInfo.id)
                        .then(async status => {
                            try {
                                await download(toDownload);
                            } catch (error) { alert(error); }
                        }).catch(error => alert(error));
                } else { download(toDownload); }
            } else {
                alert(langContext.state.translation["downloadedAlert"]);
            }
        }
    }

    return authContext.state.authenticated && props.state.userBuyCourse && props.state.totalLessons === null ? <ActivityIndicator color={theme.tintColor} />
    : <TouchableOpacity style={styles.iconButton} disabled={downloadPreparing} onPress={onPressDownload} >
        <Icon reverse type="font-awesome" name="arrow-down" color={Colors.transparent} reverseColor={Colors.dodgerBlue} containerStyle={{borderColor: Colors.dodgerBlue, borderWidth: 1}} />
        {downloading ? <Text style={{color: Colors.dodgerBlue}}>{langContext.state.translation["downloading"]}... {typeof downloadProgress === "number" ? `${Utilities.roundFloat(downloadProgress)} %` : null}</Text> :<Text style={{color: Colors.dodgerBlue}}>{langContext.state.translation["download"]}</Text>}
        {props.state.isDownloaded || downloading ? <Text style={{color: Colors.dodgerBlue}}>{langContext.state.translation["downloaded"]} {downloadedLessons}/{props.state.totalLessons} {langContext.state.translation["lesson"]}</Text> : null}
    </TouchableOpacity>
}

export default DownloadInfo;

const styles = StyleSheet.create({
    iconButton: {
        alignItems: "center"
    }
});