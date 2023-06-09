import { Injectable } from "@angular/core";

declare var $: any;
declare var bootstrap: any;

@Injectable({ providedIn: 'root' })
export class InitJsUtility {
    toggleNav() {
        document.querySelector('.menu-toggle').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('open'));
        document.querySelector('.btn-right a')?.addEventListener('click', () => document.querySelector('.rightbar').classList.toggle('open'));
        document.querySelector('.sidebar-mini-btn').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle("sidebar-mini"));
        document.querySelector('.hamburger-icon').addEventListener('click', () => document.querySelector('.hamburger-icon').classList.toggle('active'));
        document.querySelector('.inbox .fa-star')?.addEventListener('click', () => document.querySelector('.inbox .fa-star').classList.toggle('active'));
        document.querySelector('.main-search input').addEventListener('focus', () => { document.querySelector('.search-result')?.classList.add('show') });
        document.querySelector('.main-search input').addEventListener('blur', () => {
            setTimeout(function () {
                document.querySelector('.search-result')?.classList.remove('show');
            }, 200)
        });
    }

    toggleChangeTheme() {
        var t = document.querySelector('.theme-switch input[type="checkbox"]') as HTMLInputElement | null,
            c = document.querySelector('.theme-high-contrast input[type="checkbox"]') as HTMLInputElement | null,
            o = document.querySelector('.theme-dark input[type="checkbox"]') as HTMLInputElement | null,
            e = localStorage.getItem("theme");
        e &&
            (document.documentElement.setAttribute("data-theme", e),
                "dark" === e && (t?.checked != false, o?.checked != true, c?.checked != true),
                "theme-dark" === e && (o?.checked != false, c?.checked != true, t?.checked != true),
                "high-contrast" === e &&
                (c?.checked != false, t?.checked != true, o?.checked != true)),
            t?.addEventListener(
                "change",
                function (e) {
                    (e.target as HTMLInputElement).checked
                        ? (document.documentElement.setAttribute("data-theme", "dark"),
                            localStorage.setItem("theme", "dark"),
                            c?.checked != true,
                            o?.checked != true)
                        : (document.documentElement.setAttribute("data-theme", "light"),
                            localStorage.setItem("theme", "light"));
                },
                !1
            ),
            c?.addEventListener(
                "change",
                function (e) {
                    (e.target as HTMLInputElement).checked
                        ? (document.documentElement.setAttribute(
                            "data-theme",
                            "high-contrast"
                        ),
                            localStorage.setItem("theme", "high-contrast"),
                            t.checked != true,
                            o.checked != true)
                        : (document.documentElement.setAttribute("data-theme", "light"),
                            localStorage.setItem("theme", "light"));
                },
                !1
            ),
            o?.addEventListener(
                "change",
                function (e) {
                    (e.target as HTMLInputElement).checked
                        ? (document.documentElement.setAttribute(
                            "data-theme",
                            "theme-dark"
                        ),
                            localStorage.setItem("theme", "theme-dark"),
                            t.checked != true,
                            c.checked != true)
                        : (document.documentElement.setAttribute("data-theme", "light"),
                            localStorage.setItem("theme", "light"));
                },
                !1
            ),
            // $(".quick-light-dark").on("click", function () {
            //     $(this).toggleClass("active"),
            //         "light" == localStorage.getItem("theme")
            //             ? (document.documentElement.setAttribute("data-theme", "dark"),
            //                 localStorage.setItem("theme", "dark"),
            //                 $("#theme-switch").prop("checked", !0))
            //             : (document.documentElement.setAttribute("data-theme", "light"),
            //                 localStorage.setItem("theme", "light"),
            //                 $("#theme-switch").prop("checked", !1));
            // });
            document.querySelector('.quick-light-dark')?.addEventListener('click', () => {
                document.querySelector('.quick-light-dark').classList.toggle("active");
                let curTheme: string = localStorage.getItem("theme");

                if (curTheme == "light") {
                    // document.documentElement.setAttribute("data-theme", "theme-dark");
                    // document.documentElement.setAttribute("data-luno", "theme-cyan");
                    // document.querySelector('body')?.setAttribute("data-luno", "theme-cyan");
                    // localStorage.setItem("theme", "theme-dark");
                    // localStorage.setItem("data-luno", "theme-cyan");
                    document.documentElement.setAttribute("data-theme", "dark");
                    localStorage.setItem("theme", "dark");
                    document.querySelector('#theme-switch')?.setAttribute('checked', 'true');
                } else {
                    document.documentElement.setAttribute("data-theme", "light");
                    localStorage.setItem("theme", "light");
                    document.querySelector('#theme-switch')?.setAttribute('checked', 'false');
                }
            })
    }
}
