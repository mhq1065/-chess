// game.ts
import ajax from "./ajax";

export function create() {
    return ajax.post("/createGame").then((data) => {
        switch (data.data.state) {
            case 200:
                return data.data;
            case 303:
                throw new Error("token失效");
            case 304:
                throw new Error("用户已在对局中");
            case 500:
                throw new Error("(服务器系统错误");
        }
    });
}

export function join(gid: string) {
    return ajax
        .post("/joinGame", {
            guid: gid,
        })
        .then((data) => {
            switch (data.data.state) {
                case 200:
                    return data.data;
                case 303:
                    throw new Error("token失效");
                case 304:
                    throw new Error("用户已在对局中");
                case 310:
                    throw new Error("(服务器系统错误");
                case 311:
                    throw new Error("对局人数已满");
            }
        });
}
