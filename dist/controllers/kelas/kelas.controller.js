"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteKelas = exports.UpdateKelas = exports.CreateKelas = exports.FindKelasById = exports.GetAllKelas = exports.SearchKelas = void 0;
var kelas_query_1 = require("@/utils/queries/kelas.query");
var apiResponse_1 = require("@/utils/apiResponse");
var SearchKelas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.query.name)
                    return [2 /*return*/, res.status(400).json((0, apiResponse_1.BadRequest)("Name is required"))];
                return [4 /*yield*/, (0, kelas_query_1.searchKelas)(req.query.name.toString())];
            case 1:
                response = _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json((0, apiResponse_1.Success)("Siswa loaded successfully", { data: response }))];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json((0, apiResponse_1.InternalServerError)());
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.SearchKelas = SearchKelas;
// FIND KELAS BY ID
var GetAllKelas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, kelas_query_1.getAllKelas)({
                        rombel: ((_a = req.token) === null || _a === void 0 ? void 0 : _a.semester)
                            ? { every: { semester_id: (_b = req.token) === null || _b === void 0 ? void 0 : _b.semester } }
                            : undefined,
                    })];
            case 1:
                response = _c.sent();
                if (response == null) {
                    return [2 /*return*/, res.status(400).json((0, apiResponse_1.BadRequest)("Cannot find any kelas"))];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json((0, apiResponse_1.Success)("Kelas loaded successfully", { data: response }))];
            case 2:
                error_2 = _c.sent();
                console.log(error_2);
                res.status(500).json((0, apiResponse_1.InternalServerError)());
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetAllKelas = GetAllKelas;
var FindKelasById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, kelas_query_1.findKelasById)(req.params.id)];
            case 1:
                response = _a.sent();
                if (response == null) {
                    return [2 /*return*/, res.status(404).json((0, apiResponse_1.BadRequest)("Cannot find any kelas"))];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json((0, apiResponse_1.Success)("Kelas loaded successfully", { data: response }))];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).json((0, apiResponse_1.InternalServerError)());
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.FindKelasById = FindKelasById;
// CREATE NEW KELAS
var CreateKelas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = __assign(__assign({}, req.body), { id: (req.body.tingkat +
                        req.body.nama_kelas[0] +
                        req.body.nama_kelas.replace(/\D/g, "")).toLowerCase() });
                return [4 /*yield*/, (0, kelas_query_1.createKelas)(data)];
            case 1:
                response = _a.sent();
                if (!response) {
                    return [2 /*return*/, res.status(400).json((0, apiResponse_1.BadRequest)("Failed creating kelas"))];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json((0, apiResponse_1.CreatedSuccessfully)("Kelas created successfully", { data: response }))];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                res.status(500).json((0, apiResponse_1.InternalServerError)());
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.CreateKelas = CreateKelas;
// UPDATE EXISTING KELAS
var UpdateKelas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, kelas_query_1.updateKelas)(req.params.id, req.body)];
            case 1:
                response = _a.sent();
                if (!response) {
                    return [2 /*return*/, res.status(400).json((0, apiResponse_1.BadRequest)("Failed updating kelas"))];
                }
                return [2 /*return*/, res.status(200).json((0, apiResponse_1.Success)("Kelas updated successfully"))];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(500).json((0, apiResponse_1.InternalServerError)());
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateKelas = UpdateKelas;
// DELETE KELAS
var DeleteKelas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, kelas_query_1.deleteKelas)(req.params.id)];
            case 1:
                response = _a.sent();
                if (!response) {
                    return [2 /*return*/, res.status(400).json((0, apiResponse_1.BadRequest)("Cannot find any kelas"))];
                }
                return [2 /*return*/, res.status(200).json((0, apiResponse_1.Success)("Kelas deleted successfully"))];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                res.status(500).json((0, apiResponse_1.InternalServerError)());
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeleteKelas = DeleteKelas;
//# sourceMappingURL=kelas.controller.js.map