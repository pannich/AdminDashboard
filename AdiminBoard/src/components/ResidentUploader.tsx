/**
 *  ResidentUploader.tsx
 *
 *  Parsing Excel + inserting students
 *
 */

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { residentUploader } from "../api/ResidentUploader";
import type { Resident, FailedResident } from "../utils/types";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function ResidentUploader(props: any) {

  const onDrop = useCallback((residentFiles: File[]) => {
    Promise
      .all(residentFiles.map(file => residentUploader.insert_from_excel(file)))
      .then((resps: { successCount: number; failedResidents: FailedResident[] }[]) => {
        let allFailed: FailedResident[] = [];
        resps.forEach(resp => {
          allFailed = allFailed.concat(resp.failedResidents);
        })
        const allSuccess = resps.map(resp => resp.successCount)
          .reduce((p, v) => p + v, 0);

        props.onChange({
          failedResidents: allFailed,
          successCount: allSuccess,
          failedCount: allFailed.length,
          attemptedCount: allFailed.length + allSuccess
        });
      })
      .catch((err) => {
        console.error('Unexpected Error: ', err)
        props.onChange({
          failedResidents: [],
          successCount: 0,
          failedCount: residentFiles.length,
          attemptedCount: residentFiles.length
        })
      });
  }, [])

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel': [] } });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container">
      <div {...getRootProps({ style: style as React.CSSProperties })}>
        <input {...getInputProps()} />
        <p>Drag the resident file here, or click to select the file</p>
      </div>
    </div>
  );
}


export default ResidentUploader;
