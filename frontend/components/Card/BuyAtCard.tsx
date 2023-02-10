import { classNames } from "@/lib";
import Link from "next/link";

const BuyAtCard = (props: { Icon: "Amazon" | "Flipkart"; to: string }) => {
  if (props.Icon === "Amazon") {
    return (
      <Link
        href={props.to}
        className={classNames(
          "bg-black flex items-center justify-center md:py-3 md:px-4 rounded-xl max-md:px-2"
        )}
      >
        <svg
          className="fill-none h-6 max-md:h-5"
          viewBox="0 0 107 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_90)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M66.3809 25.025C60.1629 29.5733 51.1504 32 43.3908 32C32.5105 32 22.7155 28.0064 15.3052 21.3642C14.723 20.8419 15.2446 20.13 15.9433 20.5368C23.9404 25.1544 33.8286 27.9324 44.0428 27.9324C50.9315 27.9324 58.5095 26.518 65.4773 23.5829C66.5299 23.1391 67.4102 24.267 66.3809 25.025Z"
              fill="#FF9900"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M68.9657 22.0898C68.1739 21.0822 63.7118 21.6137 61.7091 21.8495C61.0989 21.9234 61.0057 21.3965 61.5553 21.0175C65.1091 18.5353 70.9405 19.2518 71.6205 20.0838C72.3005 20.9204 71.4435 26.7214 68.104 29.4901C67.5916 29.9153 67.1026 29.6888 67.3308 29.1249C68.0807 27.2668 69.7621 23.1021 68.9657 22.0898Z"
              fill="#FF9900"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M61.849 3.4944V1.08157C61.849 0.716416 62.1284 0.471436 62.4638 0.471436H73.3487C73.698 0.471436 73.9775 0.721038 73.9775 1.08157V3.14773C73.9728 3.4944 73.6794 3.94738 73.1577 4.66383L67.5173 12.6557C69.6132 12.6049 71.8256 12.9146 73.7259 13.9777C74.1544 14.2181 74.2709 14.5694 74.3035 14.916V17.4906C74.3035 17.8419 73.9122 18.2533 73.5024 18.0407C70.1535 16.2981 65.7055 16.1086 62.0027 18.0592C61.6254 18.2626 61.2295 17.8558 61.2295 17.5045V15.0593C61.2295 14.6664 61.2341 13.9962 61.63 13.3999L68.1647 4.09992H62.4777C62.1284 4.09992 61.849 3.85494 61.849 3.4944Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.1424 18.5491H18.8308C18.5141 18.526 18.2625 18.2903 18.2393 17.9898V1.12318C18.2393 0.785753 18.5234 0.517659 18.8774 0.517659H21.9654C22.2868 0.531516 22.5429 0.776505 22.5662 1.08157V3.2864H22.6268C23.4325 1.15553 24.9463 0.161743 26.9863 0.161743C29.059 0.161743 30.3538 1.15553 31.2853 3.2864C32.0864 1.15553 33.9076 0.161743 35.8591 0.161743C37.2471 0.161743 38.7655 0.730282 39.6924 2.00603C40.7403 3.42507 40.5261 5.4866 40.5261 7.29391L40.5214 17.939C40.5214 18.2764 40.2373 18.5491 39.8833 18.5491H36.5764C36.2457 18.526 35.9802 18.2626 35.9802 17.939V8.99952C35.9802 8.28769 36.0454 6.51274 35.8871 5.83789C35.6402 4.70544 34.8996 4.3865 33.9402 4.3865C33.1391 4.3865 32.3007 4.91806 31.9607 5.76856C31.6207 6.61906 31.6533 8.04271 31.6533 8.99952V17.939C31.6533 18.2764 31.3692 18.5491 31.0152 18.5491H27.7082C27.3729 18.526 27.1121 18.2626 27.1121 17.939L27.1074 8.99952C27.1074 7.11826 27.4195 4.34952 25.0674 4.34952C22.6873 4.34952 22.7805 7.04892 22.7805 8.99952V17.939C22.7805 18.2764 22.4963 18.5491 22.1424 18.5491"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M83.3487 0.161743C88.2625 0.161743 90.922 4.34952 90.922 9.67438C90.922 14.819 87.9831 18.9004 83.3487 18.9004C78.5234 18.9004 75.8965 14.7126 75.8965 9.49411C75.8965 4.24321 78.556 0.161743 83.3487 0.161743ZM83.3767 3.60534C80.9361 3.60534 80.7823 6.90563 80.7823 8.96255C80.7823 11.0241 80.7497 15.4245 83.3487 15.4245C85.9151 15.4245 86.0362 11.8746 86.0362 9.71135C86.0362 8.28769 85.9756 6.5867 85.5425 5.23699C85.1698 4.06294 84.4293 3.60534 83.3767 3.60534Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M97.2935 18.5491H93.9958C93.6652 18.526 93.3997 18.2626 93.3997 17.939L93.395 1.06771C93.423 0.758016 93.6978 0.517659 94.0331 0.517659H97.1025C97.3913 0.531516 97.6288 0.725661 97.694 0.989131V3.56836H97.7546C98.6814 1.26184 99.9809 0.161743 102.268 0.161743C103.754 0.161743 105.202 0.693305 106.134 2.14932C107 3.49902 107 5.76856 107 7.40022V18.0176C106.963 18.3134 106.688 18.5491 106.362 18.5491H103.041C102.738 18.526 102.487 18.3042 102.454 18.0176V8.85623C102.454 7.01195 102.668 4.31254 100.381 4.31254C99.5757 4.31254 98.8351 4.84873 98.4672 5.66224C98.0014 6.69301 97.9409 7.71916 97.9409 8.85623V17.939C97.9362 18.2764 97.6474 18.5491 97.2935 18.5491"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M53.1718 10.4926C53.1718 11.7729 53.2044 12.8407 52.5524 13.9777C52.026 14.9022 51.1877 15.4707 50.2608 15.4707C48.9893 15.4707 48.244 14.5093 48.244 13.0903C48.244 10.2892 50.7731 9.78072 53.1718 9.78072V10.4926ZM56.5114 18.5029C56.2924 18.6971 55.9757 18.7109 55.7289 18.5815C54.6297 17.6756 54.4294 17.2549 53.8286 16.3906C52.0121 18.2302 50.7219 18.7803 48.3698 18.7803C45.5799 18.7803 43.4141 17.0747 43.4141 13.6588C43.4141 10.9918 44.8672 9.17521 46.9446 8.28773C48.7424 7.50194 51.2529 7.36328 53.1718 7.14603V6.72078C53.1718 5.93962 53.2324 5.01516 52.7666 4.34031C52.366 3.73479 51.5929 3.48519 50.9082 3.48519C49.646 3.48519 48.5235 4.12769 48.2487 5.4589C48.1928 5.75473 47.9739 6.04593 47.6711 6.0598L44.462 5.71775C44.1919 5.65766 43.8891 5.44041 43.9683 5.02903C44.7042 1.16482 48.2254 0 51.374 0C52.9855 0 55.0908 0.42525 56.3623 1.63628C57.9738 3.12928 57.8201 5.12148 57.8201 7.28932V12.4108C57.8201 13.95 58.4629 14.6249 59.0684 15.4569C59.278 15.7527 59.3246 16.1086 59.0544 16.3305C58.3791 16.8898 57.1774 17.9298 56.516 18.5122L56.5113 18.5029"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.75776 10.4928C9.75776 11.7732 9.79036 12.8409 9.13829 13.978C8.61198 14.9024 7.77826 15.471 6.84673 15.471C5.57519 15.471 4.83463 14.5095 4.83463 13.0905C4.83463 10.2894 7.36373 9.78097 9.75776 9.78097V10.4928ZM13.0973 18.5032C12.8784 18.6973 12.5617 18.7112 12.3148 18.5818C11.2156 17.6758 11.02 17.2552 10.4145 16.3908C8.598 18.2305 7.3125 18.7805 4.95573 18.7805C2.17046 18.7805 0 17.0749 0 13.6591C0 10.992 1.45784 9.17545 3.53049 8.28798C5.32834 7.50219 7.83881 7.36352 9.75776 7.14628V6.72103C9.75776 5.93986 9.81831 5.01541 9.3572 4.34056C8.95198 3.73504 8.17882 3.48544 7.4988 3.48544C6.23658 3.48544 5.10943 4.12793 4.83463 5.45915C4.77874 5.75497 4.55983 6.04618 4.26174 6.06004L1.04797 5.71799C0.777826 5.65791 0.479736 5.44066 0.554259 5.02928C1.29482 1.16506 4.81134 0.000244141 7.95991 0.000244141C9.57145 0.000244141 11.6767 0.425494 12.9482 1.63653C14.5598 3.12952 14.4061 5.12172 14.4061 7.28957V12.411C14.4061 13.9503 15.0488 14.6251 15.6543 15.4571C15.8686 15.7529 15.9152 16.1089 15.645 16.3307C14.9697 16.89 13.768 17.93 13.1066 18.5124L13.0973 18.5032"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_90">
              <rect width="107" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Link>
    );
  }
  return (
    <Link
      href={props.to}
      className={classNames(
        "bg-black flex items-center justify-center md:py-2 md:px-4 rounded-xl max-md:px-2"
      )}
    >
      <svg
        className="fill-none h-8"
        viewBox="0 0 107 45"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30.1408 12.8485C31.0077 12.6904 32.0321 12.6114 32.7413 13.1647C33.2141 13.4808 33.3718 14.113 33.293 14.6663C33.293 15.6147 32.899 16.5631 32.1109 17.0373C31.4017 17.4325 30.5348 17.4325 29.7468 17.3535C29.1952 17.2744 28.6435 16.9583 28.4071 16.4841C27.7766 15.1405 28.5647 13.1647 30.1408 12.8485Z"
          fill="white"
        />
        <path
          d="M30.1408 12.8485C31.0077 12.6904 32.0321 12.6114 32.7413 13.1647C33.2141 13.4808 33.3718 14.113 33.293 14.6663C33.293 15.6147 32.899 16.5631 32.1109 17.0373C31.4017 17.4325 30.5348 17.4325 29.7468 17.3535C29.1952 17.2744 28.6435 16.9583 28.4071 16.4841C27.7766 15.1405 28.5647 13.1647 30.1408 12.8485Z"
          stroke="white"
          strokeWidth="0.003175"
          strokeMiterlimit="22.926"
        />
        <path
          d="M4.21037 13.9122C4.28918 13.438 4.68324 12.9637 5.23487 12.9637C9.01747 12.9637 12.8 12.9637 16.5038 12.9637C16.8978 12.9637 17.3707 13.1219 17.5283 13.438C17.8435 13.9122 17.5283 14.4655 17.5283 15.0187C17.4495 15.73 17.4495 16.5993 16.6615 16.9155C13.9033 16.9945 11.1452 16.9155 8.38703 16.9155C8.15062 18.6543 7.91421 20.3931 7.59899 22.1319C7.59899 22.2109 7.59899 22.3689 7.59899 22.4479C9.6479 22.4479 11.618 22.4479 13.6669 22.4479C14.2185 22.4479 14.849 22.9222 14.7702 23.4754C14.6914 24.1077 14.6125 24.661 14.5337 25.2933C14.4549 25.6885 14.1397 26.0836 13.7457 26.1627C11.5391 26.2417 9.25384 26.0836 6.96852 26.2417C6.5745 28.6918 6.18048 31.2209 5.78646 33.671C5.70765 34.1452 5.31367 34.6194 4.84085 34.6194C3.8952 34.6194 2.94954 34.6194 2.0827 34.6194C1.45226 34.6194 0.979381 33.9871 1.13699 33.3548C2.16144 26.7949 3.18592 20.314 4.21037 13.9122Z"
          fill="white"
        />
        <path
          d="M4.21037 13.9122C4.28918 13.438 4.68324 12.9637 5.23487 12.9637C9.01747 12.9637 12.8 12.9637 16.5038 12.9637C16.8978 12.9637 17.3707 13.1219 17.5283 13.438C17.8435 13.9122 17.5283 14.4655 17.5283 15.0187C17.4495 15.73 17.4495 16.5993 16.6615 16.9155C13.9033 16.9945 11.1452 16.9155 8.38704 16.9155C8.15062 18.6543 7.91421 20.3931 7.59899 22.1319C7.59899 22.2109 7.59899 22.3689 7.59899 22.4479C9.6479 22.4479 11.618 22.4479 13.6669 22.4479C14.2185 22.4479 14.849 22.9222 14.7702 23.4754C14.6914 24.1077 14.6125 24.661 14.5337 25.2933C14.4549 25.6885 14.1397 26.0836 13.7457 26.1627C11.5391 26.2417 9.25384 26.0836 6.96852 26.2417C6.5745 28.6918 6.18048 31.2209 5.78646 33.671C5.70765 34.1452 5.31367 34.6194 4.84085 34.6194C3.89519 34.6194 2.94954 34.6194 2.0827 34.6194C1.45226 34.6194 0.979381 33.9871 1.13699 33.3548C2.16144 26.7949 3.18592 20.314 4.21037 13.9122Z"
          stroke="white"
          strokeWidth="0.003175"
          strokeMiterlimit="22.926"
        />
        <path
          d="M20.8193 13.0457C21.6861 12.9667 22.553 13.0457 23.4199 13.0457C23.9715 13.0457 24.4443 13.4409 24.5232 13.9942C24.5232 14.3893 24.4443 14.8635 24.3655 15.2587C23.6562 19.6847 22.947 24.0316 22.3166 28.4576C22.2378 29.1689 22.0014 29.8802 22.2378 30.6706C22.4742 31.3819 23.5775 31.0658 23.8139 31.8561C23.9715 32.4884 23.8139 33.1207 23.7351 33.753C23.6563 34.5433 22.7894 34.7804 22.0801 34.9385C20.6617 35.1756 19.0068 35.0175 17.9824 33.832C17.2731 32.9626 17.1943 31.7771 17.3519 30.7496C18.2187 25.1381 19.0856 19.6057 19.9525 13.9942C20.1101 13.4409 20.4253 13.0457 20.8193 13.0457Z"
          fill="white"
        />
        <path
          d="M20.8193 13.0457C21.6861 12.9666 22.553 13.0457 23.4199 13.0457C23.9715 13.0457 24.4443 13.4409 24.5232 13.9942C24.5232 14.3893 24.4443 14.8635 24.3655 15.2587C23.6562 19.6847 22.947 24.0316 22.3166 28.4576C22.2378 29.1689 22.0014 29.8802 22.2378 30.6706C22.4742 31.3819 23.5775 31.0658 23.8139 31.8561C23.9715 32.4884 23.8139 33.1207 23.7351 33.753C23.6563 34.5433 22.7894 34.7804 22.0801 34.9385C20.6617 35.1756 19.0068 35.0175 17.9824 33.832C17.2731 32.9626 17.1943 31.777 17.3519 30.7496C18.2187 25.1381 19.0856 19.6057 19.9525 13.9942C20.1101 13.4409 20.4253 13.0457 20.8193 13.0457Z"
          stroke="white"
          strokeWidth="0.003175"
          strokeMiterlimit="22.926"
        />
        <path
          d="M53.2822 13.9123C53.361 13.4381 53.755 12.9638 54.2278 12.9638H56.7496C57.3801 12.9638 57.8529 13.5962 57.6952 14.2284C57.1436 17.8641 56.5132 21.4996 55.9616 25.1352C56.8284 24.9772 57.7741 24.8192 58.4045 24.1078C59.429 22.9223 60.217 21.6577 60.8474 20.2351C61.0838 19.6818 61.1627 18.8915 61.8719 18.8124C62.8176 18.8124 63.7632 18.8124 64.7088 18.8124C65.3393 18.8124 65.8121 19.5237 65.5757 20.077C65.3393 20.9464 64.9452 21.7368 64.4724 22.5271C63.5267 24.1078 62.5023 25.6094 61.0839 26.795C61.7143 28.6128 62.4235 30.3516 63.1328 32.1694C63.2904 32.7226 63.8419 33.434 63.3691 33.9872C62.8963 34.6986 61.9507 34.3034 61.2414 34.3824C60.5322 34.3034 59.4289 34.6985 59.0349 33.8291C58.2468 32.0113 57.6165 30.1936 56.8284 28.4548C56.3556 28.4548 55.8827 28.4548 55.4099 28.4548C55.4099 28.5338 55.3311 28.6128 55.2523 28.6918C55.0159 30.3516 54.7795 31.9323 54.4643 33.5921C54.3855 33.9872 54.0703 34.3034 53.5975 34.3824C52.7306 34.3824 51.8637 34.3824 50.9969 34.3824C50.6029 34.3824 50.2877 34.1453 50.1301 33.8291C49.9724 33.513 50.0513 33.1179 50.1301 32.8017C51.3121 26.5579 52.2578 20.2351 53.2822 13.9123Z"
          fill="white"
        />
        <path
          d="M53.2822 13.9123C53.361 13.4381 53.755 12.9638 54.2278 12.9638H56.7496C57.3801 12.9638 57.8529 13.5962 57.6952 14.2284C57.1436 17.8641 56.5132 21.4996 55.9616 25.1352C56.8284 24.9772 57.7741 24.8192 58.4045 24.1078C59.429 22.9223 60.217 21.6577 60.8474 20.2351C61.0838 19.6818 61.1627 18.8915 61.8719 18.8124C62.8176 18.8124 63.7632 18.8124 64.7088 18.8124C65.3393 18.8124 65.8121 19.5237 65.5757 20.077C65.3393 20.9464 64.9452 21.7368 64.4724 22.5271C63.5267 24.1078 62.5023 25.6094 61.0839 26.795C61.7143 28.6128 62.4235 30.3516 63.1328 32.1694C63.2904 32.7226 63.8419 33.434 63.3691 33.9872C62.8963 34.6986 61.9507 34.3034 61.2414 34.3824C60.5322 34.3034 59.4289 34.6985 59.0349 33.8291C58.2468 32.0113 57.6165 30.1936 56.8284 28.4548C56.3556 28.4548 55.8827 28.4548 55.4099 28.4548C55.4099 28.5338 55.3311 28.6128 55.2523 28.6918C55.0159 30.3516 54.7795 31.9323 54.4643 33.5921C54.3855 33.9872 54.0703 34.3034 53.5975 34.3824C52.7306 34.3824 51.8637 34.3824 50.9969 34.3824C50.6029 34.3824 50.2877 34.1453 50.1301 33.8291C49.9724 33.513 50.0513 33.1179 50.1301 32.8017C51.3121 26.5579 52.2578 20.2351 53.2822 13.9123Z"
          stroke="white"
          strokeWidth="0.003175"
          strokeMiterlimit="22.926"
        />
        <path
          d="M98.7147 15.6496C98.7935 15.1754 99.2663 14.8593 99.7391 14.8593C100.37 14.8593 101.079 14.8593 101.709 14.8593C102.261 14.8593 102.655 15.4126 102.576 15.9658C102.497 16.9142 102.261 17.8626 102.182 18.732C102.812 18.732 103.443 18.732 104.073 18.732C104.625 18.732 105.098 19.2853 105.019 19.9176C104.94 20.3918 104.861 20.945 104.704 21.4192C104.625 21.8144 104.231 22.2096 103.837 22.2886C103.049 22.3677 102.261 22.2886 101.552 22.3676C101.236 24.5806 100.842 26.7936 100.527 28.9276C100.448 29.4018 100.448 30.034 100.764 30.4292C101.236 30.9824 101.946 30.7453 102.576 30.8244C103.049 30.9824 103.364 31.5357 103.285 32.0099C103.206 32.5631 103.207 33.1165 103.049 33.6697C102.891 34.302 102.182 34.381 101.63 34.5391C100.133 34.9343 98.3995 34.9343 97.1386 34.0649C95.8778 33.1955 95.7201 31.6148 95.8777 30.1921C96.1929 27.5049 96.7445 24.8968 97.0598 22.2096C96.5869 22.2096 96.0353 22.2886 95.7201 21.8934C95.3261 21.4983 95.5625 20.866 95.5625 20.3918C95.6414 19.8385 95.6413 19.1272 96.2717 18.8901C96.7445 18.732 97.2962 18.811 97.769 18.811C98.0842 17.7836 98.3995 16.6771 98.7147 15.6496Z"
          fill="white"
        />
        <path
          d="M98.7147 15.6496C98.7935 15.1754 99.2663 14.8593 99.7391 14.8593C100.37 14.8593 101.079 14.8593 101.709 14.8593C102.261 14.8593 102.655 15.4126 102.576 15.9658C102.497 16.9142 102.261 17.8626 102.182 18.732C102.812 18.732 103.443 18.732 104.073 18.732C104.625 18.732 105.098 19.2853 105.019 19.9176C104.94 20.3918 104.861 20.945 104.704 21.4192C104.625 21.8144 104.231 22.2096 103.837 22.2886C103.049 22.3677 102.261 22.2886 101.552 22.3676C101.236 24.5806 100.842 26.7936 100.527 28.9276C100.448 29.4018 100.448 30.034 100.764 30.4292C101.236 30.9824 101.946 30.7453 102.576 30.8244C103.049 30.9824 103.364 31.5357 103.285 32.0099C103.206 32.5631 103.207 33.1165 103.049 33.6697C102.891 34.302 102.182 34.381 101.63 34.5391C100.133 34.9343 98.3995 34.9343 97.1386 34.0649C95.8778 33.1955 95.7201 31.6148 95.8777 30.1921C96.1929 27.5049 96.7445 24.8968 97.0598 22.2096C96.5869 22.2096 96.0353 22.2886 95.7201 21.8934C95.3261 21.4983 95.5625 20.866 95.5625 20.3918C95.6414 19.8385 95.6413 19.1272 96.2717 18.8901C96.7445 18.732 97.2962 18.811 97.769 18.811C98.0842 17.7836 98.3995 16.6771 98.7147 15.6496Z"
          stroke="white"
          strokeWidth="0.003175"
          strokeMiterlimit="22.926"
        />
        <path
          d="M89.494 21.0066C90.5185 19.9792 91.7794 19.1098 93.1979 18.7146C93.8283 18.3984 94.6163 18.9518 94.6163 19.6631C94.5375 20.5325 94.3011 21.4808 94.1435 22.3502C94.0647 22.8244 93.6707 23.1406 93.2767 23.2197C91.7006 23.5358 90.2822 24.4842 89.1789 25.5907C88.8637 25.9068 88.4696 26.302 88.4696 26.7762C88.1544 29.0683 87.7604 31.3602 87.4452 33.6523C87.3663 34.1265 86.9724 34.6006 86.4995 34.6006H83.9777C83.4261 34.6006 82.8745 34.0475 82.9534 33.4942C83.6626 28.9892 84.3718 24.4051 85.081 19.9001C85.081 19.4259 85.475 19.0308 85.9479 18.9517C86.5783 18.9517 87.13 18.9517 87.7604 18.9517C88.2332 18.9517 88.706 19.4259 88.706 19.9001C88.706 20.6114 88.6272 21.3228 88.6272 22.0341C88.8636 21.718 89.1788 21.3228 89.494 21.0066Z"
          fill="white"
        />
        <path
          d="M89.494 21.0066C90.5185 19.9792 91.7794 19.1098 93.1979 18.7146C93.8283 18.3984 94.6163 18.9518 94.6163 19.6631C94.5375 20.5325 94.3011 21.4808 94.1435 22.3502C94.0647 22.8244 93.6707 23.1406 93.2767 23.2197C91.7006 23.5358 90.2822 24.4842 89.1789 25.5907C88.8637 25.9069 88.4696 26.302 88.4696 26.7762C88.1544 29.0683 87.7604 31.3602 87.4452 33.6523C87.3663 34.1265 86.9724 34.6006 86.4995 34.6006H83.9777C83.4261 34.6006 82.8745 34.0475 82.9534 33.4942C83.6626 28.9892 84.3718 24.4051 85.081 19.9001C85.081 19.4259 85.475 19.0308 85.9479 18.9517C86.5783 18.9517 87.13 18.9517 87.7604 18.9517C88.2332 18.9517 88.706 19.4259 88.706 19.9001C88.706 20.6114 88.6272 21.3228 88.6272 22.0341C88.8636 21.718 89.1788 21.3228 89.494 21.0066Z"
          stroke="white"
          strokeWidth="0.003175"
          strokeMiterlimit="22.926"
        />
        <path
          d="M28.3296 18.8752C29.1965 18.7171 30.1421 18.8752 31.009 18.7961C31.4818 18.7171 32.0335 19.0332 32.1123 19.5865C32.1911 20.0607 32.0335 20.4558 32.0335 20.9301C31.3242 25.1189 30.6938 29.3868 30.0634 33.5757C29.9846 34.0499 29.5905 34.5242 29.1177 34.5242C28.2508 34.5242 27.3839 34.5242 26.4383 34.5242C25.8867 34.4451 25.4926 33.8128 25.6503 33.2595C26.3595 28.9126 26.99 24.4866 27.6992 20.1397C27.778 19.6655 27.8568 19.1123 28.3296 18.8752Z"
          fill="white"
        />
        <path
          d="M28.3296 18.8752C29.1965 18.7171 30.1421 18.8752 31.009 18.7961C31.4818 18.7171 32.0335 19.0332 32.1123 19.5865C32.1911 20.0607 32.0335 20.4558 32.0335 20.9301C31.3242 25.1189 30.6938 29.3868 30.0634 33.5757C29.9846 34.0499 29.5905 34.5242 29.1177 34.5242C28.2508 34.5242 27.3839 34.5242 26.4383 34.5242C25.8867 34.4451 25.4926 33.8128 25.6503 33.2595C26.3595 28.9126 26.99 24.4866 27.6992 20.1397C27.778 19.6655 27.8568 19.1123 28.3296 18.8752Z"
          stroke="white"
          strokeWidth="0.003175"
          strokeMiterlimit="22.926"
        />
        <path
          d="M76.6507 26.8233C76.0202 28.0879 75.0746 29.1944 74.0502 30.1428C73.4986 30.617 72.7105 31.1702 71.9224 31.0121C71.1344 30.8541 70.7404 30.0637 70.5828 29.3524C70.1888 27.5346 70.5828 25.4797 71.6073 23.899C72.0801 23.1877 72.7893 22.6345 73.6562 22.3974C74.8382 22.0812 76.0991 22.2393 77.2811 22.5554L77.3599 22.6344C77.1235 23.978 76.8871 25.4007 76.6507 26.8233ZM81.2214 19.1569C78.7784 18.6827 76.3355 18.3666 73.8137 18.6037C71.6072 18.9198 69.4008 19.8682 68.0611 21.686C66.1698 24.0571 65.5393 27.2976 65.9333 30.3009C66.1697 31.7235 66.8001 33.1461 67.9822 34.0945C69.0855 34.9639 70.504 35.043 71.8436 34.8059C73.6561 34.4107 75.2322 33.2252 76.4931 31.9606C76.5719 32.5139 76.4143 33.0671 76.4931 33.6203C76.4931 34.0946 76.966 34.5687 77.5176 34.5687H79.1725C79.6453 34.5687 80.0393 34.0946 80.1181 33.6203C80.8273 29.1944 81.5366 24.7684 82.2458 20.3424C82.2458 19.7101 81.8518 19.1569 81.2214 19.1569Z"
          fill="white"
        />
        <path
          d="M76.6507 26.8233C76.0202 28.0879 75.0746 29.1944 74.0502 30.1428C73.4986 30.617 72.7105 31.1702 71.9224 31.0121C71.1344 30.8541 70.7404 30.0637 70.5828 29.3524C70.1888 27.5346 70.5828 25.4797 71.6073 23.899C72.0801 23.1877 72.7893 22.6345 73.6562 22.3974C74.8382 22.0812 76.0991 22.2393 77.2811 22.5554L77.3599 22.6344C77.1235 23.978 76.8871 25.4007 76.6507 26.8233ZM81.2214 19.1569C78.7784 18.6827 76.3355 18.3666 73.8137 18.6037C71.6072 18.9198 69.4008 19.8682 68.0611 21.686C66.1698 24.0571 65.5393 27.2976 65.9333 30.3009C66.1697 31.7235 66.8001 33.1461 67.9822 34.0945C69.0855 34.9639 70.504 35.043 71.8436 34.8059C73.6561 34.4107 75.2322 33.2252 76.4931 31.9606C76.5719 32.5139 76.4143 33.0671 76.4931 33.6203C76.4931 34.0946 76.966 34.5687 77.5176 34.5687H79.1725C79.6453 34.5687 80.0393 34.0946 80.1181 33.6203C80.8273 29.1944 81.5366 24.7684 82.2458 20.3424C82.2458 19.7101 81.8518 19.1569 81.2214 19.1569Z"
          stroke="white"
          strokeWidth="0.003175"
          strokeMiterlimit="22.926"
        />
        <path
          d="M44.6027 26.0574C44.5239 27.5591 43.9722 29.0608 42.9477 30.1673C41.608 31.4319 39.5591 31.2738 37.8254 30.8787C37.8254 30.7996 37.7467 30.7205 37.7467 30.7205C37.9831 29.2979 38.1407 27.8753 38.4559 26.4526C39.4016 24.951 40.5048 23.4494 42.0809 22.58C42.6325 22.2638 43.4994 22.3428 43.8934 22.896C44.6027 23.7654 44.6815 24.951 44.6027 26.0574ZM49.1733 24.3977C49.1733 22.738 48.7004 20.9993 47.5972 19.8137C46.8091 18.9444 45.6271 18.4701 44.5238 18.5491C42.6325 18.4701 40.8201 19.4185 39.4804 20.6831C39.1652 20.9202 38.9287 21.3154 38.6135 21.4735C38.6135 20.9202 38.6923 20.367 38.6135 19.8137C38.6135 19.3395 38.1407 18.8653 37.6679 18.8653H36.013C35.4614 18.8653 35.0673 19.3395 35.0673 19.8137C34.0428 26.3737 33.0185 32.9335 31.994 39.4934C31.8364 40.1257 32.388 40.758 33.0184 40.679C33.9641 40.679 34.8309 40.758 35.7765 40.5999C36.4858 40.4419 36.4858 39.5725 36.5646 38.9402C36.801 37.5176 37.0375 36.0159 37.1951 34.5933C40.426 35.2256 44.1299 34.7513 46.5728 32.3803C48.3853 30.2463 49.2521 27.243 49.1733 24.3977Z"
          fill="white"
        />
        <path
          d="M44.6027 26.0574C44.5239 27.5591 43.9722 29.0608 42.9477 30.1673C41.608 31.4319 39.5591 31.2738 37.8254 30.8787C37.8254 30.7996 37.7467 30.7205 37.7467 30.7205C37.9831 29.2979 38.1407 27.8753 38.4559 26.4526C39.4016 24.951 40.5048 23.4494 42.0809 22.58C42.6325 22.2638 43.4994 22.3428 43.8934 22.896C44.6027 23.7654 44.6815 24.951 44.6027 26.0574ZM49.1733 24.3977C49.1733 22.738 48.7004 20.9993 47.5972 19.8137C46.8091 18.9444 45.6271 18.4701 44.5238 18.5491C42.6325 18.4701 40.8201 19.4185 39.4804 20.6831C39.1652 20.9202 38.9287 21.3154 38.6135 21.4735C38.6135 20.9202 38.6923 20.367 38.6135 19.8137C38.6135 19.3395 38.1407 18.8653 37.6679 18.8653H36.013C35.4614 18.8653 35.0673 19.3395 35.0673 19.8137C34.0428 26.3737 33.0185 32.9335 31.994 39.4934C31.8364 40.1257 32.388 40.758 33.0184 40.679C33.9641 40.679 34.8309 40.758 35.7765 40.5999C36.4858 40.4419 36.4858 39.5725 36.5646 38.9402C36.801 37.5176 37.0375 36.0159 37.1951 34.5933C40.426 35.2256 44.1299 34.7513 46.5728 32.3803C48.3853 30.2463 49.2521 27.243 49.1733 24.3977Z"
          stroke="white"
          strokeWidth="0.003175"
          strokeMiterlimit="22.926"
        />
      </svg>
    </Link>
  );
};

export default BuyAtCard;