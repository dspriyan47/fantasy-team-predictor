export function removeUnderScore(data: string | null){
    return (data)?data.replace("_", " "):data;
}

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}