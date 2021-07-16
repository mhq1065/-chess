import ajax from "./ajax";
export async function getHistoryStat() {
    const data = await ajax.post("/getHistoryStat");
    switch (data.data.state) {
        case 200:
            return data.data;
        case 300:
            throw new Error("用户名冲突");
        case 400:
            throw new Error("数据库查询失败");
    }
}
export async function getHistorySummaries() {
    const data = await ajax.post("/getHistorySummaries");
    switch (data.data.state) {
        case 200:
            return data.data;
        case 300:
            throw new Error("用户名冲突");
        case 400:
            throw new Error("数据库查询失败");
    }
}
export async function getStepRecords(guid: string) {
    const data = await ajax.post("/getStepRecords", {
        guid: guid,
    });
    switch (data.data.state) {
        case 200:
            return data.data;
        case 303:
            throw new Error("Token失效，请重新登录");
        case 310:
            throw new Error("对局不存在");
        case 320:
            throw new Error("无权获取记录");
        case 400:
            throw new Error("数据库查询失败");
    }
}
