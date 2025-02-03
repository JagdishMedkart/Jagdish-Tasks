import { takeEvery, put, call } from "redux-saga/effects";
import apiClient from "@/axios";
import { fetchModules, setModules, setModulesError } from "./dashboardSlice";

function* getModules(action) {
    try {
        const token = action.payload;
        const response = yield call(apiClient.get, "/api/v1/master/user/current-user/data", {
            headers: {
                Authorization: token
            }
        });

        console.log(response);

        let permissions = response.data?.user?.permissions || [];
        console.log(permissions);

        if (!permissions.length) {
            console.error("No permissions found, setting empty modules");
            yield put(setModules([]));
            return;
        }

        let allModules = permissions.reduce((acc, warehouse) => {
            warehouse.permissions.forEach((item) => {
                // eslint-disable-next-line @next/next/no-assign-module-variable
                const module = item.module;
                if(!acc[module]) {
                    acc[module] = {
                        name: module,
                        submodules: [],
                        image: `/${module}.png`
                    };
                }
                item.sub_module.forEach((sub) => {
                    acc[module].submodules.push(sub.sub_module);
                });
            });
            return acc;
        }, {});

        console.log("all modules = ", allModules );

        allModules = Object.values(allModules);

        console.log("all modules now = ", allModules);

        yield put(setModules(allModules));

        // yield put(loginSuccess());
        // yield put(setName(name));
        // router.push("/dashboard");
    } catch (error) {
        console.error("Error fetching modules:", error);
        yield put(setModulesError());
    }
}

function* dashboardSaga() {
    yield takeEvery(fetchModules.type, getModules);
}

export default dashboardSaga;