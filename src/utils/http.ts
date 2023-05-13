import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';
import { useCallback } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

// 封装http
interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    /***
     *   headers:{
     *             Authorization:token ? `Bearer${token}`:'',
     *             'Content-Type':data ? 'application/json':'',
     *         },
     */
    ...customConfig,
  };
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    console.log(response, 'response');
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: '请重新登录' });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      // 需要手动抛出异常
      return Promise.reject(data);
    }
  });
  // 第二个参数
};
// hooks
// 如果要想使用hooks 本身必须是一个hooks
export const useHttp = () => {
  const { user } = useAuth();
  // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
// utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作  && 联合类型

let myFavoriteNumber: string | number;

myFavoriteNumber = 'serven';

myFavoriteNumber = 7;

// myFavoriteNumber = {}

let jackFavoriteNumber: string | number;

// 类型别名: 抽象 类型

type FavoriteNumber = string | number;

let rose: FavoriteNumber = '888';

// 在其他类型的基础上,可以组合成一个新的类型

// interface 没法实现 Utility type

interface Person {
  name: string;
  age: number;
}

const xiaoMing: Partial<Person> = {};
const shenMiRen: Omit<Person, 'name' | 'age'> = {};
type PersonKeys = keyof Person;
//
type PersonOnlyName = Pick<Person, 'name' | 'age'>;

type Age = Exclude<Person, 'name'>;

// Partial 的实现

type Partial<T> = {
  // ? 可选 T[P]-- 值
  [P in keyof T]?: T[P];
};

// Omit
